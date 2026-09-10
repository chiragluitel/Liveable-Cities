using System.Net.Http.Json; //This provide the exensions methods to easily serialize C# objects into json http requests bodies

using System.Text.Json; /*This uses the .net's built in high perf json library
 (jsonDocument, json element, json serializer) used to parse and modify geeJson.*/

using Microsoft.AspNetCore.Mvc; /*Imports ASP.NET Core controller base classes, routing attributes ([ApiController],
 [Route], [HttpPost]), and action results (Ok, BadRequest, StatusCode).*/
//new version

namespace CaseySmartHub.Api.Controllers; // this declares the file scopeed namespace containing this api controller

[ApiController] // enables automatic model validation, automatic http 400 on bad inputs, inference of binding sources 
[Route("api/custom-walk-route-experimental")]//defines the endpoint url base
public class CustomWalkRouteController : ControllerBase //inherits from controllerbase, provider helper methods like ok() and badrequest()
{
    private readonly IHttpClientFactory _httpClientFactory;//.net factory

    private readonly IConfiguration _configuration;
    private readonly ILogger<CustomWalkRouteController> _logger;

    private static readonly Dictionary<string, CaseyDatasetDefinition> DatasetDefinitions = new(StringComparer.OrdinalIgnoreCase)
    {
        ["bbq"] = new("barbecue_pt_t1eam", "bbq", "BBQ"),
        ["barbecue"] = new("barbecue_pt_t1eam", "bbq", "BBQ"),

        ["offLeash"] = new("dog-friendly-spaces", "offLeash", "Off-leash dog park"),
        ["off-leash"] = new("dog-friendly-spaces", "offLeash", "Off-leash dog park"),
        ["dogFriendly"] = new("dog-friendly-spaces", "offLeash", "Off-leash dog park"),

        ["toilet"] = new("public_toilet_block_pt_t1eam", "toilet", "Toilet"),
        ["disabledToilets"] = new("public_toilet_block_pt_t1eam", "toilet", "Toilet"),
    };
        /* Makes ditionary lookups case insensitive, Maps frontend filter aliases e.g. "offleash", "dogfriendly" to
        the Casey ODE data ids "dog-friendly-spaces" */

    
    //Constructor
    /* Injects the required services from ASP.NET and stores them in private readonnly fields*/
    public CustomWalkRouteController(
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration,
        ILogger<CustomWalkRouteController> logger)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
        _logger = logger;
    }





    //Main action method Getcustomewalkroute
    [HttpPost]//Handles the incoming post requests
    public async Task<IActionResult> GetCustomWalkRoute([FromBody] CustomWalkRouteRequest request)
    // [FromBody] desrializes the json body into a customwalkrouterequest object
    {
        if (request.Start is null)//Checks against request that are missing gps coordinates 
        {
            return BadRequest(new
            {
                message = "A start coordinate is required."
            });
        }

        if (!IsValidCoordinate(request.Start) || (request.End is not null && !IsValidCoordinate(request.End)))
        //Ensures the latitudes and lontitude are within specific ranges (lat[-90, 90] Long[-180, 180])
        {
            return BadRequest(new
            {
                message = "Invalid latitude or longitude values."
            });
        }

        //Fetches the ORS api key, if missing turns and http 500 error 
        var apiKey = _configuration["OpenRouteService:ApiKey"];

        if (string.IsNullOrWhiteSpace(apiKey))
        {
            return StatusCode(500, new
            {
                message = "OpenRouteService API key is not configured on the backend."
            });
        }

        
        // calls buildroutepoints to build a skeleton of waypoints (start -> amentities -> return points -> back to start)
        var routePoints = await BuildRoutePoints(request);

        if (routePoints.Count < 2)// if the routepoints doesnt have at least 2, flag an error
        {
            return BadRequest(new
            {
                message = "Could not build enough route points for the requested walk."
            });
        }


        //calling openrouteservice api
        var orsRequest = new
        {
            coordinates = routePoints.Select(point => new[] { point.Lng, point.Lat }).ToArray(),
            instructions = true//tells ors to return step by step guidance and summary statistics.
        };

        var httpClient = _httpClientFactory.CreateClient();

        using var httpRequest = new HttpRequestMessage(
            HttpMethod.Post,
            "https://api.openrouteservice.org/v2/directions/foot-hiking/geojson"
        );

        if (!httpRequest.Headers.TryAddWithoutValidation("Authorization", apiKey))
        {
            return StatusCode(500, new
            {
                message = "Could not add OpenRouteService authorization header."
            });
        }

        httpRequest.Content = JsonContent.Create(orsRequest);

        try
        {
            using var orsResponse = await httpClient.SendAsync(httpRequest);
            var responseContent = await orsResponse.Content.ReadAsStringAsync();

            if (!orsResponse.IsSuccessStatusCode)
            {
                _logger.LogWarning(
                    "OpenRouteService request failed. Status: {StatusCode}, Response: {Response}",
                    orsResponse.StatusCode,
                    responseContent
                );

                return StatusCode((int)orsResponse.StatusCode, new
                {
                    message = "OpenRouteService request failed.",
                    statusCode = (int)orsResponse.StatusCode,
                    details = responseContent
                });
            }

            using var document = JsonDocument.Parse(responseContent);
            var rawRouteGeoJson = document.RootElement.Clone();

            // Protected places (Start + requested amenities) - any spur leading to a requested amenity is preserved
            var protectedPlaces = new List<RouteCoordinate> { request.Start! };
            if (routePoints.Count >= 4)
            {
                protectedPlaces.AddRange(routePoints.Skip(1).Take(routePoints.Count - 4));
            }

            // Prune unneeded out-and-back spurs (dead-end cul-de-sac detours used for distance padding)
            var (routeGeoJson, summary) = PruneGeoJsonSpurs(rawRouteGeoJson, protectedPlaces);

            return Ok(new CustomWalkRouteResponse
            {
                Title = request.Title,
                TargetDistanceKm = request.TargetDistanceKm,
                SelectedFilters = request.SelectedFilters ?? [],
                DistanceMeters = summary.DistanceMeters,
                DurationSeconds = summary.DurationSeconds,
                DistanceText = FormatDistance(summary.DistanceMeters),
                DurationText = FormatDuration(summary.DurationSeconds),
                Waypoints = routePoints,
                RouteGeoJson = routeGeoJson
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while calling OpenRouteService.");

            return StatusCode(500, new
            {
                message = "An error occurred while requesting the route."
            });
        }
    }

    private async Task<List<RouteCoordinate>> BuildRoutePoints(CustomWalkRouteRequest request)
    {
        var start = request.Start!;

        if (request.End is not null &&
            (request.TargetDistanceKm is null ||
             request.SelectedFilters is null ||
             request.SelectedFilters.Count == 0))
        {
            return [start, request.End];
        }

        var routePoints = new List<RouteCoordinate> { start };

        var targetDistanceMeters = Math.Max((request.TargetDistanceKm ?? 1) * 1000, 500);
        var selectedFilters = request.SelectedFilters ?? [];

        var requiredPlaces = await GetNearestRequiredPlaces(start, selectedFilters, targetDistanceMeters);

        // Sort required amenity places using Nearest Neighbor starting from the start coordinate to prevent criss-crossing paths
        var sortedPlaces = SortPlacesNearestNeighbor(start, requiredPlaces);

        routePoints.AddRange(
            sortedPlaces.Select(place => new RouteCoordinate
            {
                Lat = place.Lat,
                Lng = place.Lng
            })
        );

        // Generate 2 arc guide points to form a smooth circular loop back to start (with smoothness damper applied)
        var arcPoints = GenerateLoopArcPoints(
            start,
            routePoints.Skip(1).ToList(),
            targetDistanceMeters,
            request.Strictness
        );

        routePoints.AddRange(arcPoints);

        // Return walk: finish at the same location where the user started.
        routePoints.Add(start);

        return routePoints;
    }

    private async Task<List<CaseyPlace>> GetNearestRequiredPlaces(
        RouteCoordinate start,
        List<string> selectedFilters,
        double targetDistanceMeters)
    {
        var filters = selectedFilters
            .Where(filter => !string.IsNullOrWhiteSpace(filter) && DatasetDefinitions.ContainsKey(filter))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        if (filters.Count == 0)
        {
            return [];
        }

        var httpClient = _httpClientFactory.CreateClient();
        var places = new List<CaseyPlace>();

        foreach (var filter in filters)
        {
            var dataset = DatasetDefinitions[filter];

            var url =
                $"https://data.casey.vic.gov.au/api/explore/v2.1/catalog/datasets/{dataset.DatasetId}/records?limit=100";

            try
            {
                using var response = await httpClient.GetAsync(url);
                var content = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning(
                        "Could not load Casey open data dataset {DatasetId}. Status: {StatusCode}",
                        dataset.DatasetId,
                        response.StatusCode
                    );

                    continue;
                }

                using var document = JsonDocument.Parse(content);
                var datasetPlaces = CaseyOpenDataController.ParsePlaces(document.RootElement, dataset);

                var nearest = datasetPlaces
                    .Where(place => IsValidCoordinate(new RouteCoordinate
                    {
                        Lat = place.Lat,
                        Lng = place.Lng
                    }))
                    .Select(place => new
                    {
                        Place = place,
                        Distance = HaversineMeters(start.Lat, start.Lng, place.Lat, place.Lng)
                    })

                    // This avoids choosing an amenity too far away for the requested walk.
                    // Caps amenity search to 35% of target distance (max 1000m) to prevent 2km+ out-and-back amenity detours.
                    .Where(x => x.Distance <= Math.Min(targetDistanceMeters * 0.35, 1000))
                    // Avoid selecting an amenity that is clustered right next to an already selected amenity (< 30m away)
                    .Where(x => !places.Any(existing => HaversineMeters(existing.Lat, existing.Lng, x.Place.Lat, x.Place.Lng) < 30))
                    .OrderBy(x => x.Distance)
                    .FirstOrDefault();

                if (nearest is not null)
                {
                    places.Add(nearest.Place);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not load Casey open data places for filter {Filter}", filter);
            }
        }

        return places;
    }

    private static List<CaseyPlace> SortPlacesNearestNeighbor(RouteCoordinate start, List<CaseyPlace> places)
    {
        if (places.Count <= 1)
        {
            return places;
        }

        var unvisited = new List<CaseyPlace>(places);
        var sorted = new List<CaseyPlace>();

        var currentLat = start.Lat;
        var currentLng = start.Lng;

        while (unvisited.Count > 0)
        {
            var nearest = unvisited
                .Select(place => new
                {
                    Place = place,
                    Distance = HaversineMeters(currentLat, currentLng, place.Lat, place.Lng)
                })
                .OrderBy(x => x.Distance)
                .First();

            sorted.Add(nearest.Place);
            unvisited.Remove(nearest.Place);

            currentLat = nearest.Place.Lat;
            currentLng = nearest.Place.Lng;
        }

        return sorted;
    }

    private static List<RouteCoordinate> GenerateLoopArcPoints(
        RouteCoordinate start,
        List<RouteCoordinate> requiredPlaces,
        double targetDistanceMeters,
        string strictness = "Smooth")
    {
        // Circumference C = 2 * PI * R, so R = targetDistanceMeters / (2 * PI * damper)
        // Applying a smoothness damper (1.25 for Smooth mode) keeps guide points within local neighborhoods
        // without forcing OpenRouteService to take awkward side-street detours just for distance padding.
        bool isStrict = string.Equals(strictness, "Strict", StringComparison.OrdinalIgnoreCase);
        double damper = isStrict ? 1.0 : 1.25;

        var radiusMeters = Math.Max(targetDistanceMeters / (2 * Math.PI * damper), 220);

        var baseBearing = 90.0;

        if (requiredPlaces.Count > 0)
        {
            var bearings = requiredPlaces
                .Select(p => BearingDegrees(start.Lat, start.Lng, p.Lat, p.Lng))
                .ToList();

            baseBearing = bearings.Average();
        }

        // Generate 2 arc points at +120° and +240° relative to the amenities' average direction
        // to form a smooth, 360-degree circular perimeter loop back to start.
        var arcPoint1 = DestinationPoint(start.Lat, start.Lng, (baseBearing + 120) % 360, radiusMeters);
        var arcPoint2 = DestinationPoint(start.Lat, start.Lng, (baseBearing + 240) % 360, radiusMeters);

        return [arcPoint1, arcPoint2];
    }

    private static (JsonElement PrunedGeoJson, RouteSummary Summary) PruneGeoJsonSpurs(
        JsonElement rootGeoJson,
        List<RouteCoordinate> protectedPlaces)
    {
        try
        {
            var feature = rootGeoJson.GetProperty("features")[0];
            var geometry = feature.GetProperty("geometry");
            var coordsElement = geometry.GetProperty("coordinates");

            var rawCoords = new List<double[]>();
            foreach (var elem in coordsElement.EnumerateArray())
            {
                rawCoords.Add([elem[0].GetDouble(), elem[1].GetDouble()]);
            }

            if (rawCoords.Count < 5)
            {
                var origSummary = GetRouteSummary(rootGeoJson);
                return (rootGeoJson, origSummary);
            }

            var prunedCoords = new List<double[]>(rawCoords);
            bool modified = false;

            int i = 1;
            while (i < prunedCoords.Count - 2)
            {
                int maxK = 0;
                int k = 1;

                while (i - k >= 0 && i + k < prunedCoords.Count)
                {
                    var pBefore = prunedCoords[i - k];
                    var pAfter = prunedCoords[i + k];
                    var dist = HaversineMeters(pBefore[1], pBefore[0], pAfter[1], pAfter[0]);

                    if (dist <= 25.0)
                    {
                        maxK = k;
                        k++;
                    }
                    else
                    {
                        break;
                    }
                }

                if (maxK >= 1)
                {
                    var tip = prunedCoords[i];
                    // Check if tip is near a protected amenity waypoint
                    bool isProtected = protectedPlaces.Any(p =>
                        HaversineMeters(tip[1], tip[0], p.Lat, p.Lng) <= 35.0);

                    if (!isProtected)
                    {
                        int startRemove = i - maxK + 1;
                        int countRemove = (i + maxK) - startRemove + 1;

                        prunedCoords.RemoveRange(startRemove, countRemove);
                        modified = true;
                        i = Math.Max(1, startRemove - 1);
                        continue;
                    }
                }

                i++;
            }

            if (!modified)
            {
                var origSummary = GetRouteSummary(rootGeoJson);
                return (rootGeoJson, origSummary);
            }

            // Re-calculate total distance of pruned coordinates
            double totalMeters = 0;
            for (int idx = 0; idx < prunedCoords.Count - 1; idx++)
            {
                totalMeters += HaversineMeters(
                    prunedCoords[idx][1], prunedCoords[idx][0],
                    prunedCoords[idx + 1][1], prunedCoords[idx + 1][0]
                );
            }

            double durationSecs = totalMeters / 1.35;

            var newGeoJsonObj = new
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
                                distance = totalMeters,
                                duration = durationSecs
                            }
                        },
                        geometry = new
                        {
                            type = "LineString",
                            coordinates = prunedCoords.Select(c => new[] { c[0], c[1] }).ToArray()
                        }
                    }
                }
            };

            var jsonString = JsonSerializer.Serialize(newGeoJsonObj);
            using var doc = JsonDocument.Parse(jsonString);
            var prunedElement = doc.RootElement.Clone();

            return (prunedElement, new RouteSummary(totalMeters, durationSecs));
        }
        catch
        {
            var origSummary = GetRouteSummary(rootGeoJson);
            return (rootGeoJson, origSummary);
        }
    }

    private static bool IsValidCoordinate(RouteCoordinate coordinate)
    {
        return coordinate.Lat >= -90 &&
               coordinate.Lat <= 90 &&
               coordinate.Lng >= -180 &&
               coordinate.Lng <= 180;
    }

    private static double HaversineMeters(double lat1, double lng1, double lat2, double lng2)
    {
        const double earthRadiusMeters = 6371000;

        var dLat = DegreesToRadians(lat2 - lat1);
        var dLng = DegreesToRadians(lng2 - lng1);

        var a =
            Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
            Math.Cos(DegreesToRadians(lat1)) *
            Math.Cos(DegreesToRadians(lat2)) *
            Math.Sin(dLng / 2) *
            Math.Sin(dLng / 2);

        var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

        return earthRadiusMeters * c;
    }

    private static double BearingDegrees(double lat1, double lng1, double lat2, double lng2)
    {
        var phi1 = DegreesToRadians(lat1);
        var phi2 = DegreesToRadians(lat2);
        var lambda1 = DegreesToRadians(lng1);
        var lambda2 = DegreesToRadians(lng2);

        var y = Math.Sin(lambda2 - lambda1) * Math.Cos(phi2);

        var x =
            Math.Cos(phi1) * Math.Sin(phi2) -
            Math.Sin(phi1) * Math.Cos(phi2) * Math.Cos(lambda2 - lambda1);

        return (RadiansToDegrees(Math.Atan2(y, x)) + 360) % 360;
    }

    private static RouteCoordinate DestinationPoint(
        double lat,
        double lng,
        double bearingDegrees,
        double distanceMeters)
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

        return new RouteCoordinate
        {
            Lat = RadiansToDegrees(phi2),
            Lng = RadiansToDegrees(lambda2)
        };
    }

    private static double DegreesToRadians(double degrees) => degrees * Math.PI / 180;

    private static double RadiansToDegrees(double radians) => radians * 180 / Math.PI;

    private static RouteSummary GetRouteSummary(JsonElement routeGeoJson)
    {
        try
        {
            var summary = routeGeoJson
                .GetProperty("features")[0]
                .GetProperty("properties")
                .GetProperty("summary");

            var distance = summary.GetProperty("distance").GetDouble();
            var duration = summary.GetProperty("duration").GetDouble();

            return new RouteSummary(distance, duration);
        }
        catch
        {
            return new RouteSummary(0, 0);
        }
    }

    private static string FormatDistance(double meters)
    {
        if (meters <= 0)
        {
            return "0 km";
        }

        return $"{meters / 1000:0.0} km";
    }

    private static string FormatDuration(double seconds)
    {
        if (seconds <= 0)
        {
            return "0 mins";
        }

        var minutes = Math.Round(seconds / 60);

        return $"{minutes:0} mins";
    }
}

public class CustomWalkRouteRequest
{
    public string? Title { get; set; }

    public double? TargetDistanceKm { get; set; }

    public List<string>? SelectedFilters { get; set; }

    public RouteCoordinate? Start { get; set; }

    public RouteCoordinate? End { get; set; }

    /// <summary>
    /// Controls routing priority: "Smooth" (default, flexible distance for clean circular paths)
    /// vs "Strict" (prioritizes matching exact target distance).
    /// </summary>
    public string Strictness { get; set; } = "Smooth";
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
}

public record RouteSummary(double DistanceMeters, double DurationSeconds);