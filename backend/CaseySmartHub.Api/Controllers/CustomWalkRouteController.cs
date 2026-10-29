using System.Globalization;
using System.Net.Http.Json;
using System.Text.Json;
using CaseySmartHub.Api.Clients;
using CaseySmartHub.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace CaseySmartHub.Api.Controllers;

[ApiController]
[Route("api/custom-walk-route")]
public class CustomWalkRouteController : ControllerBase
{
    // First guess at how much longer a walk along the streets is than straight lines between its waypoints.
    // Every routed attempt replaces it with the real figure for that area.
    private const double InitialDetourFactor = 1.45;
    private const double MinLoopRadiusMeters = 60;
    // If the nearest amenity is further away than this it is left out (and reported) instead of stretching the walk.
    private const double MaxAmenityDistanceMeters = 3000;
    // Amenities closer together than this are visited as one stop.
    private const double SameStopMeters = 30;
    private const int AttemptsPerDirection = 2;
    // Loops at least this round are used without trying other directions (a square scores about 0.8, while
    // zigzagging or self-crossing loops score under 0.3).
    private const double RoundEnough = 0.45;
    private static readonly TimeSpan PlacesCacheTtl = TimeSpan.FromHours(6);

    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;
    private readonly IMemoryCache _cache;
    private readonly CaseyOpenDataClient _openDataClient;
    private readonly IBbqService _bbqService;
    private readonly IBenchService _benchService;
    private readonly IDrinkingFountainService _drinkingFountainService;
    private readonly ILibraryService _libraryService;
    private readonly IPublicToiletService _publicToiletService;
    private readonly ILogger<CustomWalkRouteController> _logger;

    public CustomWalkRouteController(
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration,
        IMemoryCache cache,
        CaseyOpenDataClient openDataClient,
        IBbqService bbqService,
        IBenchService benchService,
        IDrinkingFountainService drinkingFountainService,
        ILibraryService libraryService,
        IPublicToiletService publicToiletService,
        ILogger<CustomWalkRouteController> logger)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
        _cache = cache;
        _openDataClient = openDataClient;
        _bbqService = bbqService;
        _benchService = benchService;
        _drinkingFountainService = drinkingFountainService;
        _libraryService = libraryService;
        _publicToiletService = publicToiletService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> GetCustomWalkRoute(
        [FromBody] CustomWalkRouteRequest request,
        CancellationToken cancellationToken)
    {
        if (request.Start is null)
        {
            return BadRequest(new { message = "A start coordinate is required." });
        }

        if (!IsValidCoordinate(request.Start) || (request.End is not null && !IsValidCoordinate(request.End)))
        {
            return BadRequest(new { message = "Invalid latitude or longitude values." });
        }

        if (string.IsNullOrWhiteSpace(_configuration["OpenRouteService:ApiKey"]))
        {
            _logger.LogWarning("OpenRouteService API key is not configured. Using OSRM foot routing instead.");
        }

        var start = request.Start;

        // An end point without loop settings is a plain A-to-B route.
        if (request.End is not null &&
            (request.TargetDistanceKm is null ||
             request.SelectedFilters is null ||
             request.SelectedFilters.Count == 0))
        {
            List<RouteCoordinate> directPoints = [start, request.End];
            var directRoute = await GetWalkingRouteAsync(directPoints, cancellationToken)
                ?? BuildStraightLineRoute(directPoints);
            return Ok(BuildResponse(request, directRoute, directPoints));
        }

        var targetDistanceMeters = Math.Max((request.TargetDistanceKm ?? 1) * 1000, 500);
        var tolerance = string.Equals(request.Strictness, "Strict", StringComparison.OrdinalIgnoreCase) ? 0.05 : 0.10;

        var (amenities, unavailableFilters) = await FindNearestAmenitiesAsync(
            start,
            request.SelectedFilters ?? [],
            cancellationToken);

        // Amenities that a loop of the requested length can't reach without being extended.
        var outOfRange = amenities
            .Where(amenity => ShortestLoopMeters(start, [amenity.Location], InitialDetourFactor) > targetDistanceMeters)
            .ToList();

        List<RouteAmenity> skipped = request.ExtendToReachAmenities ? [] : outOfRange;
        amenities = amenities.Except(skipped).ToList();

        var stops = MergeNearbyStops(amenities.Select(amenity => amenity.Location));
        var plan = await PlanLoopAsync(start, stops, targetDistanceMeters, tolerance, cancellationToken);

        var extended = plan.Extended && plan.Route.DistanceMeters > targetDistanceMeters * (1 + tolerance);
        var extensionMeters = extended ? plan.Route.DistanceMeters - targetDistanceMeters : 0;
        var notices = new List<string>();

        if (extended)
        {
            var reachedFor = outOfRange.Count > 0 ? outOfRange : amenities;
            notices.Add(
                $"Your walk was extended by {FormatDistance(extensionMeters)} " +
                $"(to {FormatDistance(plan.Route.DistanceMeters)}) to reach the nearest " +
                $"{JoinNames(reachedFor.Select(amenity => AmenityName(amenity.Filter)), "and")}.");
        }

        if (unavailableFilters.Count > 0)
        {
            notices.Add(
                $"No {JoinNames(unavailableFilters.Select(AmenityName), "or")} was found within " +
                $"{FormatDistance(MaxAmenityDistanceMeters)} of your start, so it isn't included in this walk.");
        }

        notices.AddRange(skipped.Select(amenity =>
            $"The nearest {AmenityName(amenity.Filter)} is too far away for a " +
            $"{FormatDistance(targetDistanceMeters)} walk, so it isn't included."));

        var response = BuildResponse(request, plan.Route, plan.Waypoints);
        response.ExtensionMeters = extensionMeters;
        response.MissingFilters = [.. unavailableFilters, .. skipped.Select(amenity => amenity.Filter)];
        response.Notice = notices.Count > 0 ? string.Join(" ", notices) : null;

        return Ok(response);
    }

    private async Task<(List<RouteAmenity> Found, List<string> Unavailable)> FindNearestAmenitiesAsync(
        RouteCoordinate start,
        List<string> selectedFilters,
        CancellationToken cancellationToken)
    {
        var found = new List<RouteAmenity>();
        var unavailable = new List<string>();

        // Filter names that share a dataset (e.g. toilet and disabledToilets) are only looked up once.
        var filters = selectedFilters
            .Where(filter => !string.IsNullOrWhiteSpace(filter) && CaseyOpenDataController.DatasetDefinitions.ContainsKey(filter))
            .DistinctBy(filter => CaseyOpenDataController.DatasetDefinitions[filter].IconType)
            .ToList();

        foreach (var filter in filters)
        {
            var places = await LoadPlacesAsync(CaseyOpenDataController.DatasetDefinitions[filter], cancellationToken);

            var nearest = places
                .Select(place => new
                {
                    Place = place,
                    Distance = HaversineMeters(start.Lat, start.Lng, place.Lat, place.Lng)
                })
                .Where(x => x.Distance <= MaxAmenityDistanceMeters)
                .MinBy(x => x.Distance);

            if (nearest is null)
            {
                unavailable.Add(filter);
                continue;
            }

            found.Add(new RouteAmenity(filter, nearest.Place));
        }

        return (found, unavailable);
    }

    // Every location for the amenity type, reusing the cached entity services where one exists.
    private async Task<List<RouteCoordinate>> LoadPlacesAsync(
        CaseyDatasetDefinition dataset,
        CancellationToken cancellationToken)
    {
        try
        {
            return dataset.IconType switch
            {
                "bbq" => (await _bbqService.GetBbqsAsync(cancellationToken)).Results
                    .Select(bbq => ToCoordinate(bbq.Latitude, bbq.Longitude))
                    .ToList(),
                "toilet" => (await _publicToiletService.GetPublicToiletsAsync(cancellationToken)).Results
                    .Select(toilet => ToCoordinate(toilet.Latitude, toilet.Longitude))
                    .ToList(),
                "fountain" => (await _drinkingFountainService.GetDrinkingFountainsAsync(cancellationToken)).Results
                    .Select(fountain => ToCoordinate(fountain.Latitude, fountain.Longitude))
                    .ToList(),
                "bench" => (await _benchService.GetBenchesAsync(cancellationToken)).Results
                    .Select(bench => ToCoordinate(bench.Latitude, bench.Longitude))
                    .ToList(),
                "library" => (await _libraryService.GetLibrariesAsync(cancellationToken)).Results
                    .Select(library => ToCoordinate(library.Latitude, library.Longitude))
                    .ToList(),
                _ => await LoadOpenDataPlacesAsync(dataset, cancellationToken)
            };
        }
        catch (Exception ex) when (!cancellationToken.IsCancellationRequested)
        {
            _logger.LogError(ex, "Could not load Casey open data places for {DatasetId}", dataset.DatasetId);
            return [];
        }
    }

    // Datasets without their own service (e.g. off-leash areas) are loaded in full and cached the same way.
    private async Task<List<RouteCoordinate>> LoadOpenDataPlacesAsync(
        CaseyDatasetDefinition dataset,
        CancellationToken cancellationToken)
    {
        var places = await _cache.GetOrCreateAsync($"custom-walk-places-{dataset.DatasetId}", async entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = PlacesCacheTtl;

            var records = await _openDataClient.GetAllRecordsAsync<JsonElement>(dataset.DatasetId, cancellationToken);
            return records
                .Select(record => CaseyOpenDataController.TryGetCoordinate(record, out var lat, out var lng)
                    ? ToCoordinate(lat, lng)
                    : null)
                .OfType<RouteCoordinate>()
                .ToList();
        });

        return places ?? [];
    }

    // Fits the loop pointing one way, and if it comes out messy (streets, rail lines and reserves can make the same
    // size of loop a clean ring in one direction and a zigzag in another) tries other directions too. Of the loops
    // that come out the right length, the roundest is used.
    private async Task<LoopPlan> PlanLoopAsync(
        RouteCoordinate start,
        List<RouteCoordinate> stops,
        double targetDistanceMeters,
        double tolerance,
        CancellationToken cancellationToken)
    {
        // Aim the loop at the amenities so it passes through them instead of detouring out to them.
        var baseBearing = stops.Count > 0 ? BearingTowards(start, stops) : 90.0;
        double[] bearingOffsets = stops.Count > 0 ? [0, 60, -60] : [0, 120, 240];
        var minRadius = MinLoopRadius(start, stops);
        var plans = new List<LoopPlan>();

        foreach (var offset in bearingOffsets)
        {
            var plan = await FitLoopAsync(
                start,
                stops,
                (baseBearing + offset + 360) % 360,
                minRadius,
                targetDistanceMeters,
                tolerance,
                cancellationToken);

            if (plan is null)
            {
                continue;
            }

            plans.Add(plan);

            // A clean loop of the right length is used straight away. Only messy loops are worth the extra routing
            // requests (which count against the OpenRouteService quota) of trying other directions.
            if (plan.OnTarget && Roundness(plan.Route.Coordinates) >= RoundEnough)
            {
                break;
            }
        }

        var choices = plans
            .Where(plan => Math.Abs(plan.Route.DistanceMeters - targetDistanceMeters) <= targetDistanceMeters * tolerance)
            .ToList();

        if (choices.Count == 0)
        {
            // When the walk has to be extended to reach the amenities, only loops close to the shortest extension
            // are considered, so a rounder loop doesn't stretch the walk further than it needs to.
            var extensions = plans.Where(plan => plan.OnTarget).ToList();
            if (extensions.Count > 0)
            {
                var shortestMeters = extensions.Min(plan => plan.Route.DistanceMeters);
                choices = extensions
                    .Where(plan => plan.Route.DistanceMeters <= shortestMeters * (1 + tolerance))
                    .ToList();
            }
        }

        if (choices.Count > 0)
        {
            return choices.MaxBy(plan => Roundness(plan.Route.Coordinates))!;
        }

        if (plans.Count > 0)
        {
            return plans.MinBy(plan => Math.Abs(plan.Route.DistanceMeters - targetDistanceMeters))!;
        }

        // No routing service answered, so fall back to straight lines sized to the requested distance.
        var fallbackRadius = SolveLoopRadius(start, stops, baseBearing, targetDistanceMeters, minRadius);
        var fallbackPoints = BuildLoopWaypoints(start, stops, baseBearing, fallbackRadius);
        var fallbackExtended = stops.Count > 0 &&
            LoopLengthMeters(start, stops, baseBearing, minRadius) > targetDistanceMeters;

        return new LoopPlan(BuildStraightLineRoute(fallbackPoints), fallbackPoints, fallbackExtended, false);
    }

    // Routes the loop in one direction, then resizes it using how much longer the real streets were than straight
    // lines, until it is within tolerance of the target or, when the walk has to be extended to reach the amenities,
    // it is the smallest loop that does. Otherwise the attempt closest to the target is returned.
    private async Task<LoopPlan?> FitLoopAsync(
        RouteCoordinate start,
        List<RouteCoordinate> stops,
        double bearing,
        double minRadius,
        double targetDistanceMeters,
        double tolerance,
        CancellationToken cancellationToken)
    {
        var detourFactor = InitialDetourFactor;
        var previousAtMinimum = false;
        LoopPlan? best = null;

        for (var attempt = 0; attempt < AttemptsPerDirection; attempt++)
        {
            // When even the smallest loop through the amenities is longer than requested, the walk is extended.
            var shortestMeters = LoopLengthMeters(start, stops, bearing, minRadius) * detourFactor;
            var extended = stops.Count > 0 && shortestMeters > targetDistanceMeters;
            var radius = extended
                ? minRadius
                : SolveLoopRadius(start, stops, bearing, targetDistanceMeters / detourFactor, minRadius);

            var atMinimum = radius <= minRadius;
            if (atMinimum && previousAtMinimum)
            {
                // The loop can't get any smaller, so this would repeat the last attempt.
                break;
            }

            previousAtMinimum = atMinimum;

            var waypoints = BuildLoopWaypoints(start, stops, bearing, radius);
            var routed = await GetWalkingRouteAsync(waypoints, cancellationToken);
            if (routed is null)
            {
                break;
            }

            var route = TrimGuideSpurs(routed, waypoints, stops);
            if (route.DistanceMeters <= 0)
            {
                break;
            }

            _logger.LogInformation(
                "Custom walk attempt: bearing {Bearing:0}, radius {Radius:0} m, routed {Distance:0} m for a {Target:0} m walk, roundness {Roundness:0.00}",
                bearing,
                radius,
                route.DistanceMeters,
                targetDistanceMeters,
                Roundness(route.Coordinates));

            var hitTarget = Math.Abs(route.DistanceMeters - targetDistanceMeters) <= targetDistanceMeters * tolerance;
            // Already the smallest loop through the amenities, so the extra distance can't be avoided.
            var shortestPossible = extended &&
                route.DistanceMeters > targetDistanceMeters &&
                route.DistanceMeters <= shortestMeters * (1 + tolerance);

            if (hitTarget || shortestPossible)
            {
                return new LoopPlan(route, waypoints, extended, true);
            }

            if (best is null ||
                Math.Abs(route.DistanceMeters - targetDistanceMeters) <
                Math.Abs(best.Route.DistanceMeters - targetDistanceMeters))
            {
                best = new LoopPlan(route, waypoints, extended, false);
            }

            detourFactor = Math.Clamp(
                route.DistanceMeters / PathLengthMeters(waypoints),
                detourFactor / 2,
                detourFactor * 2);
        }

        return best;
    }

    // How close the walk's shape is to a circle: 1 for a circle and about 0.8 for a square. Spikes and zigzags add
    // length without enclosing anything, and a loop that crosses itself cancels out part of its own area, so both
    // score low.
    private static double Roundness(List<double[]> coords)
    {
        if (coords.Count < 3)
        {
            return 0;
        }

        var perimeterMeters = LineLengthMeters(coords) + SegmentMeters(coords[^1], coords[0]);
        if (perimeterMeters <= 0)
        {
            return 0;
        }

        // Shoelace formula on a flat projection around the first point, which is accurate enough at walking scale.
        var metersPerDegree = Math.PI / 180 * 6371000;
        var lngScale = Math.Cos(DegreesToRadians(coords[0][1]));
        double twiceArea = 0;

        for (var i = 0; i < coords.Count; i++)
        {
            var from = coords[i];
            var to = coords[(i + 1) % coords.Count];
            var fromX = (from[0] - coords[0][0]) * lngScale * metersPerDegree;
            var fromY = (from[1] - coords[0][1]) * metersPerDegree;
            var toX = (to[0] - coords[0][0]) * lngScale * metersPerDegree;
            var toY = (to[1] - coords[0][1]) * metersPerDegree;
            twiceArea += fromX * toY - toX * fromY;
        }

        return 4 * Math.PI * Math.Abs(twiceArea / 2) / (perimeterMeters * perimeterMeters);
    }

    // A loop that leaves from and returns to the start, following a circle that passes through the start and whose
    // centre is `radiusMeters` away along `bearing`. Guide points sit a quarter-turn apart on the circle; a stop out
    // near the circle takes the place of the guide point in its quarter, and everything is visited in order around it.
    private static List<RouteCoordinate> BuildLoopWaypoints(
        RouteCoordinate start,
        List<RouteCoordinate> stops,
        double bearing,
        double radiusMeters)
    {
        var centre = DestinationPoint(start.Lat, start.Lng, bearing, radiusMeters);
        var startAngle = BearingDegrees(centre.Lat, centre.Lng, start.Lat, start.Lng);

        double AngleAroundLoop(RouteCoordinate point) =>
            (BearingDegrees(centre.Lat, centre.Lng, point.Lat, point.Lng) - startAngle + 360) % 360;

        var stopAnglesOnLoop = stops
            .Where(stop => HaversineMeters(centre.Lat, centre.Lng, stop.Lat, stop.Lng) >= radiusMeters / 2)
            .Select(AngleAroundLoop)
            .ToList();

        var guides = new[] { 90.0, 180.0, 270.0 }
            .Where(angle => !stopAnglesOnLoop.Any(stopAngle => Math.Abs(stopAngle - angle) < 45))
            .Select(angle => DestinationPoint(centre.Lat, centre.Lng, (startAngle + angle) % 360, radiusMeters));

        return [start, .. stops.Concat(guides).OrderBy(AngleAroundLoop), start];
    }

    // The loop radius whose straight-line length matches the given length (bigger loops are longer, so bisect).
    private static double SolveLoopRadius(
        RouteCoordinate start,
        List<RouteCoordinate> stops,
        double bearing,
        double straightLineMeters,
        double minRadius)
    {
        if (LoopLengthMeters(start, stops, bearing, minRadius) >= straightLineMeters)
        {
            return minRadius;
        }

        var low = minRadius;
        var high = straightLineMeters;

        for (var i = 0; i < 40; i++)
        {
            var mid = (low + high) / 2;
            if (LoopLengthMeters(start, stops, bearing, mid) < straightLineMeters)
            {
                low = mid;
            }
            else
            {
                high = mid;
            }
        }

        return (low + high) / 2;
    }

    // Keeps the way out and the way back about half the distance to the furthest stop apart, so reaching a far
    // amenity is still a loop rather than an out-and-back along the same streets.
    private static double MinLoopRadius(RouteCoordinate start, List<RouteCoordinate> stops) =>
        stops.Count == 0
            ? MinLoopRadiusMeters
            : Math.Max(
                MinLoopRadiusMeters,
                stops.Max(stop => HaversineMeters(start.Lat, start.Lng, stop.Lat, stop.Lng)) / 4);

    // Estimated walking length of the smallest loop from the start that still reaches every stop.
    private static double ShortestLoopMeters(RouteCoordinate start, List<RouteCoordinate> stops, double detourFactor) =>
        LoopLengthMeters(start, stops, BearingTowards(start, stops), MinLoopRadius(start, stops)) * detourFactor;

    private static double LoopLengthMeters(
        RouteCoordinate start,
        List<RouteCoordinate> stops,
        double bearing,
        double radiusMeters) =>
        PathLengthMeters(BuildLoopWaypoints(start, stops, bearing, radiusMeters));

    // Adds up the offsets to each stop, so stops at 350° and 10° average to 0° rather than 180°.
    private static double BearingTowards(RouteCoordinate start, List<RouteCoordinate> stops)
    {
        double north = 0;
        double east = 0;

        foreach (var stop in stops)
        {
            var distance = HaversineMeters(start.Lat, start.Lng, stop.Lat, stop.Lng);
            var bearing = DegreesToRadians(BearingDegrees(start.Lat, start.Lng, stop.Lat, stop.Lng));
            north += distance * Math.Cos(bearing);
            east += distance * Math.Sin(bearing);
        }

        return (RadiansToDegrees(Math.Atan2(east, north)) + 360) % 360;
    }

    // A guide point that lands on a dead end makes the router walk in and straight back out again. Those in-and-out
    // detours are cut off at the junction they branch from. The start and amenities are left alone because the walk
    // is meant to reach them, and each cut stops at the neighbouring waypoints so nothing else can be removed.
    private static RoutedWalk TrimGuideSpurs(
        RoutedWalk route,
        List<RouteCoordinate> waypoints,
        List<RouteCoordinate> stops)
    {
        var coords = new List<double[]>();
        foreach (var point in route.Coordinates)
        {
            if (coords.Count == 0 || SegmentMeters(coords[^1], point) > 0.5)
            {
                coords.Add(point);
            }
        }

        // Each waypoint sits at the route point nearest to it, searching on from the previous waypoint.
        var indices = new List<int> { 0 };
        for (var w = 1; w < waypoints.Count - 1; w++)
        {
            var nearest = indices[^1];
            var nearestMeters = MetersTo(coords[nearest], waypoints[w]);
            for (var i = nearest + 1; i < coords.Count; i++)
            {
                var meters = MetersTo(coords[i], waypoints[w]);
                if (meters < nearestMeters)
                {
                    nearest = i;
                    nearestMeters = meters;
                }
            }

            indices.Add(nearest);
        }

        indices.Add(coords.Count - 1);

        // Working backwards keeps the positions of earlier waypoints valid while points are removed.
        for (var w = waypoints.Count - 2; w >= 1; w--)
        {
            if (stops.Contains(waypoints[w]))
            {
                continue;
            }

            var tip = indices[w];
            var depth = 0;
            while (tip - depth - 1 >= indices[w - 1] &&
                   tip + depth + 1 < indices[w + 1] &&
                   SegmentMeters(coords[tip - depth - 1], coords[tip + depth + 1]) <= 1)
            {
                depth++;
            }

            if (depth > 0)
            {
                coords.RemoveRange(tip - depth + 1, depth * 2);
                indices[w] = tip - depth;
            }
        }

        var removedMeters = LineLengthMeters(route.Coordinates) - LineLengthMeters(coords);
        if (removedMeters <= 0)
        {
            return route;
        }

        var distanceMeters = route.DistanceMeters - removedMeters;
        return new RoutedWalk(distanceMeters, route.DurationSeconds * distanceMeters / route.DistanceMeters, coords);
    }

    private static List<RouteCoordinate> MergeNearbyStops(IEnumerable<RouteCoordinate> locations)
    {
        var stops = new List<RouteCoordinate>();

        foreach (var location in locations)
        {
            if (!stops.Any(stop => HaversineMeters(stop.Lat, stop.Lng, location.Lat, location.Lng) < SameStopMeters))
            {
                stops.Add(location);
            }
        }

        return stops;
    }

    // OpenRouteService when a key is configured, otherwise (or if it fails) the public OSRM foot router.
    private async Task<RoutedWalk?> GetWalkingRouteAsync(
        List<RouteCoordinate> waypoints,
        CancellationToken cancellationToken)
    {
        var apiKey = _configuration["OpenRouteService:ApiKey"];

        if (!string.IsNullOrWhiteSpace(apiKey))
        {
            var orsRoute = await TryGetOrsRouteAsync(waypoints, apiKey, cancellationToken);
            if (orsRoute is not null) return orsRoute;
        }

        return await TryGetOsrmRouteAsync(waypoints, cancellationToken);
    }

    private async Task<RoutedWalk?> TryGetOrsRouteAsync(
        List<RouteCoordinate> waypoints,
        string apiKey,
        CancellationToken cancellationToken)
    {
        var orsRequest = new
        {
            coordinates = waypoints.Select(point => new[] { point.Lng, point.Lat }).ToArray(),
            instructions = false
        };

        using var httpRequest = new HttpRequestMessage(
            HttpMethod.Post,
            "https://api.openrouteservice.org/v2/directions/foot-hiking/geojson"
        );

        if (!httpRequest.Headers.TryAddWithoutValidation("Authorization", apiKey))
        {
            _logger.LogWarning("Could not add OpenRouteService authorization header. Attempting OSRM fallback.");
            return null;
        }

        httpRequest.Content = JsonContent.Create(orsRequest);

        try
        {
            var httpClient = _httpClientFactory.CreateClient();
            using var orsResponse = await httpClient.SendAsync(httpRequest, cancellationToken);
            var responseContent = await orsResponse.Content.ReadAsStringAsync(cancellationToken);

            if (!orsResponse.IsSuccessStatusCode)
            {
                _logger.LogWarning(
                    "OpenRouteService request failed. Status: {StatusCode}, Response: {Response}. Attempting OSRM fallback.",
                    orsResponse.StatusCode,
                    responseContent
                );
                return null;
            }

            using var document = JsonDocument.Parse(responseContent);
            var summary = GetRouteSummary(document.RootElement);
            var geometry = document.RootElement.GetProperty("features")[0].GetProperty("geometry");

            return new RoutedWalk(summary.DistanceMeters, summary.DurationSeconds, ReadCoordinates(geometry));
        }
        catch (Exception ex) when (!cancellationToken.IsCancellationRequested)
        {
            _logger.LogError(ex, "Error while calling OpenRouteService. Attempting OSRM fallback.");
            return null;
        }
    }

    private async Task<RoutedWalk?> TryGetOsrmRouteAsync(
        List<RouteCoordinate> waypoints,
        CancellationToken cancellationToken)
    {
        try
        {
            var coords = string.Join(";", waypoints.Select(p =>
                $"{p.Lng.ToString(CultureInfo.InvariantCulture)},{p.Lat.ToString(CultureInfo.InvariantCulture)}"));
            var url = $"https://routing.openstreetmap.de/routed-foot/route/v1/foot/{coords}?overview=full&geometries=geojson";

            using var httpRequest = new HttpRequestMessage(HttpMethod.Get, url);
            // The public OSM routing server rejects requests that don't identify themselves.
            httpRequest.Headers.UserAgent.ParseAdd("CaseySmartHub/1.0 (+https://github.com/chiragluitel/Liveable-Cities)");

            var httpClient = _httpClientFactory.CreateClient();
            using var response = await httpClient.SendAsync(httpRequest, cancellationToken);
            if (!response.IsSuccessStatusCode)
            {
                _logger.LogWarning("OSRM request failed. Status: {StatusCode}", response.StatusCode);
                return null;
            }

            var content = await response.Content.ReadAsStringAsync(cancellationToken);
            using var doc = JsonDocument.Parse(content);
            if (!doc.RootElement.TryGetProperty("routes", out var routes) || routes.GetArrayLength() == 0)
                return null;

            var primaryRoute = routes[0];
            var distance = primaryRoute.GetProperty("distance").GetDouble();
            var duration = primaryRoute.GetProperty("duration").GetDouble();
            var geometry = primaryRoute.GetProperty("geometry");

            return new RoutedWalk(distance, duration, ReadCoordinates(geometry));
        }
        catch (Exception ex) when (!cancellationToken.IsCancellationRequested)
        {
            _logger.LogWarning(ex, "OSRM fallback routing failed.");
            return null;
        }
    }

    // Last resort when no routing service answers: straight lines between the waypoints.
    private static RoutedWalk BuildStraightLineRoute(List<RouteCoordinate> waypoints)
    {
        var distanceMeters = PathLengthMeters(waypoints);
        var coordinates = waypoints.Select(p => new[] { p.Lng, p.Lat }).ToList();

        return new RoutedWalk(distanceMeters, distanceMeters / 1.35, coordinates);
    }

    private static List<double[]> ReadCoordinates(JsonElement lineString) =>
        lineString.GetProperty("coordinates")
            .EnumerateArray()
            .Select(point => new[] { point[0].GetDouble(), point[1].GetDouble() })
            .ToList();

    private static JsonElement ToFeatureCollection(RoutedWalk route) =>
        JsonSerializer.SerializeToElement(new
        {
            type = "FeatureCollection",
            features = new[]
            {
                new
                {
                    type = "Feature",
                    properties = new
                    {
                        summary = new
                        {
                            distance = route.DistanceMeters,
                            duration = route.DurationSeconds
                        }
                    },
                    geometry = new
                    {
                        type = "LineString",
                        coordinates = route.Coordinates
                    }
                }
            }
        });

    private static CustomWalkRouteResponse BuildResponse(
        CustomWalkRouteRequest request,
        RoutedWalk route,
        List<RouteCoordinate> waypoints) => new()
        {
            Title = request.Title,
            TargetDistanceKm = request.TargetDistanceKm,
            SelectedFilters = request.SelectedFilters ?? [],
            DistanceMeters = route.DistanceMeters,
            DurationSeconds = route.DurationSeconds,
            DistanceText = FormatDistance(route.DistanceMeters),
            DurationText = FormatDuration(route.DurationSeconds),
            Waypoints = waypoints,
            RouteGeoJson = ToFeatureCollection(route)
        };

    // "BBQ" stays as it is, while "Water Fountain" reads as "water fountain" mid-sentence.
    private static string AmenityName(string filter)
    {
        var label = CaseyOpenDataController.DatasetDefinitions[filter].DefaultLabel;
        return label.All(char.IsUpper) ? label : label.ToLowerInvariant();
    }

    // "a", "a and b", "a, b and c"
    private static string JoinNames(IEnumerable<string> names, string conjunction)
    {
        var list = names.Distinct().ToList();
        return list.Count <= 1
            ? string.Concat(list)
            : $"{string.Join(", ", list.Take(list.Count - 1))} {conjunction} {list[^1]}";
    }

    private static RouteCoordinate ToCoordinate(double lat, double lng) => new() { Lat = lat, Lng = lng };

    private static double PathLengthMeters(List<RouteCoordinate> points)
    {
        double totalMeters = 0;
        for (int i = 0; i < points.Count - 1; i++)
        {
            totalMeters += HaversineMeters(points[i].Lat, points[i].Lng, points[i + 1].Lat, points[i + 1].Lng);
        }

        return totalMeters;
    }

    // Route geometry comes back as [lng, lat] pairs.
    private static double LineLengthMeters(List<double[]> coords)
    {
        double totalMeters = 0;
        for (int i = 0; i < coords.Count - 1; i++)
        {
            totalMeters += SegmentMeters(coords[i], coords[i + 1]);
        }

        return totalMeters;
    }

    private static double SegmentMeters(double[] from, double[] to) => HaversineMeters(from[1], from[0], to[1], to[0]);

    private static double MetersTo(double[] coord, RouteCoordinate point) =>
        HaversineMeters(coord[1], coord[0], point.Lat, point.Lng);

    private static bool IsValidCoordinate(RouteCoordinate coordinate)
    {
        return coordinate.Lat >= -90 && coordinate.Lat <= 90 &&
               coordinate.Lng >= -180 && coordinate.Lng <= 180;
    }

    private static double HaversineMeters(double lat1, double lng1, double lat2, double lng2)
    {
        const double earthRadiusMeters = 6371000;
        var dLat = DegreesToRadians(lat2 - lat1);
        var dLng = DegreesToRadians(lng2 - lng1);

        var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                Math.Cos(DegreesToRadians(lat1)) * Math.Cos(DegreesToRadians(lat2)) *
                Math.Sin(dLng / 2) * Math.Sin(dLng / 2);

        return earthRadiusMeters * 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
    }

    private static double BearingDegrees(double lat1, double lng1, double lat2, double lng2)
    {
        var phi1 = DegreesToRadians(lat1);
        var phi2 = DegreesToRadians(lat2);
        var lambda1 = DegreesToRadians(lng1);
        var lambda2 = DegreesToRadians(lng2);

        var y = Math.Sin(lambda2 - lambda1) * Math.Cos(phi2);
        var x = Math.Cos(phi1) * Math.Sin(phi2) - Math.Sin(phi1) * Math.Cos(phi2) * Math.Cos(lambda2 - lambda1);

        return (RadiansToDegrees(Math.Atan2(y, x)) + 360) % 360;
    }

    private static RouteCoordinate DestinationPoint(double lat, double lng, double bearingDegrees, double distanceMeters)
    {
        const double earthRadiusMeters = 6371000;
        var angularDistance = distanceMeters / earthRadiusMeters;
        var bearing = DegreesToRadians(bearingDegrees);
        var phi1 = DegreesToRadians(lat);
        var lambda1 = DegreesToRadians(lng);

        var phi2 = Math.Asin(
            Math.Sin(phi1) * Math.Cos(angularDistance) +
            Math.Cos(phi1) * Math.Sin(angularDistance) * Math.Cos(bearing)
        );

        var lambda2 = lambda1 + Math.Atan2(
            Math.Sin(bearing) * Math.Sin(angularDistance) * Math.Cos(phi1),
            Math.Cos(angularDistance) - Math.Sin(phi1) * Math.Sin(phi2)
        );

        return new RouteCoordinate { Lat = RadiansToDegrees(phi2), Lng = RadiansToDegrees(lambda2) };
    }

    private static double DegreesToRadians(double degrees) => degrees * Math.PI / 180;
    private static double RadiansToDegrees(double radians) => radians * 180 / Math.PI;

    private static RouteSummary GetRouteSummary(JsonElement routeGeoJson)
    {
        try
        {
            var summary = routeGeoJson.GetProperty("features")[0].GetProperty("properties").GetProperty("summary");
            return new RouteSummary(summary.GetProperty("distance").GetDouble(), summary.GetProperty("duration").GetDouble());
        }
        catch
        {
            return new RouteSummary(0, 0);
        }
    }

    private static string FormatDistance(double meters) => meters <= 0 ? "0 km" : $"{meters / 1000:0.0} km";
    private static string FormatDuration(double seconds) => seconds <= 0 ? "0 mins" : $"{Math.Round(seconds / 60):0} mins";

    private sealed record RouteAmenity(string Filter, RouteCoordinate Location);
    // Coordinates are [lng, lat] pairs, as in GeoJSON.
    private sealed record RoutedWalk(double DistanceMeters, double DurationSeconds, List<double[]> Coordinates);
    // OnTarget: within tolerance of the requested distance, or the smallest loop that reaches the amenities.
    private sealed record LoopPlan(RoutedWalk Route, List<RouteCoordinate> Waypoints, bool Extended, bool OnTarget);
}

public class CustomWalkRouteRequest
{
    public string? Title { get; set; }
    public double? TargetDistanceKm { get; set; }
    public List<string>? SelectedFilters { get; set; }
    public RouteCoordinate? Start { get; set; }
    public RouteCoordinate? End { get; set; }
    // "Strict" aims for within 5% of the target distance, "Smooth" within 10%.
    public string Strictness { get; set; } = "Smooth";
    // When the nearest amenity is too far for the requested distance: true extends the walk to reach it,
    // false leaves the amenity out and keeps the requested distance.
    public bool ExtendToReachAmenities { get; set; } = true;
}

public class RouteCoordinate
{
    public double Lat { get; set; }
    public double Lng { get; set; }
}

public class CustomWalkRouteResponse
{
    public string? Title { get; set; }
    public double? TargetDistanceKm { get; set; }
    public List<string> SelectedFilters { get; set; } = [];
    public double DistanceMeters { get; set; }
    public double DurationSeconds { get; set; }
    public string DistanceText { get; set; } = string.Empty;
    public string DurationText { get; set; } = string.Empty;
    public List<RouteCoordinate> Waypoints { get; set; } = [];
    public JsonElement RouteGeoJson { get; set; }
    // How much longer than requested the walk had to be to reach the amenities (0 when it wasn't extended).
    public double ExtensionMeters { get; set; }
    // Requested filters the walk doesn't include, e.g. when there's no amenity of that type within range.
    public List<string> MissingFilters { get; set; } = [];
    // Message for the user when the walk differs from what they asked for.
    public string? Notice { get; set; }
}

public record RouteSummary(double DistanceMeters, double DurationSeconds);
