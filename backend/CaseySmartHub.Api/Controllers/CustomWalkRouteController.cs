using System.Net.Http.Json;
using System.Text.Json;
using CaseySmartHub.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CaseySmartHub.Api.Controllers;

[ApiController]
[Route("api/custom-walk-route")]
public class CustomWalkRouteController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;
    private readonly CaseyDbContext _dbContext;
    private readonly ILogger<CustomWalkRouteController> _logger;

    public CustomWalkRouteController(
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration,
        CaseyDbContext dbContext,
        ILogger<CustomWalkRouteController> logger)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
        _dbContext = dbContext;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> GetCustomWalkRoute([FromBody] CustomWalkRouteRequest request)
    {
        if (request.Start is null)
        {
            return BadRequest(new { message = "A start coordinate is required." });
        }

        if (!IsValidCoordinate(request.Start) || (request.End is not null && !IsValidCoordinate(request.End)))
        {
            return BadRequest(new { message = "Invalid latitude or longitude values." });
        }

        var apiKey = _configuration["OpenRouteService:ApiKey"];

        var routePoints = await BuildRoutePoints(request);

        if (routePoints.Count < 2)
        {
            return BadRequest(new { message = "Could not build enough route points for the requested walk." });
        }

        // If OpenRouteService API key is not configured, attempt OSRM foot routing
        if (string.IsNullOrWhiteSpace(apiKey))
        {
            _logger.LogWarning("OpenRouteService API key is not configured. Attempting OSRM foot routing fallback.");
            var osrmRoute = await TryGetOsrmRouteAsync(request, routePoints);
            if (osrmRoute is not null) return Ok(osrmRoute);
            return Ok(GenerateSyntheticRouteResponse(request, routePoints));
        }

        var orsRequest = new
        {
            coordinates = routePoints.Select(point => new[] { point.Lng, point.Lat }).ToArray(),
            instructions = true
        };

        var httpClient = _httpClientFactory.CreateClient();

        using var httpRequest = new HttpRequestMessage(
            HttpMethod.Post,
            "https://api.openrouteservice.org/v2/directions/foot-hiking/geojson"
        );

        if (!httpRequest.Headers.TryAddWithoutValidation("Authorization", apiKey))
        {
            return StatusCode(500, new { message = "Could not add OpenRouteService authorization header." });
        }

        httpRequest.Content = JsonContent.Create(orsRequest);

        try
        {
            using var orsResponse = await httpClient.SendAsync(httpRequest);
            var responseContent = await orsResponse.Content.ReadAsStringAsync();

            if (!orsResponse.IsSuccessStatusCode)
            {
                _logger.LogWarning(
                    "OpenRouteService request failed. Status: {StatusCode}, Response: {Response}. Attempting OSRM fallback.",
                    orsResponse.StatusCode,
                    responseContent
                );

                var osrmRoute = await TryGetOsrmRouteAsync(request, routePoints);
                if (osrmRoute is not null) return Ok(osrmRoute);

                return Ok(GenerateSyntheticRouteResponse(request, routePoints));
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
            _logger.LogError(ex, "Error while calling OpenRouteService. Attempting OSRM fallback.");
            var osrmRoute = await TryGetOsrmRouteAsync(request, routePoints);
            if (osrmRoute is not null) return Ok(osrmRoute);
            return Ok(GenerateSyntheticRouteResponse(request, routePoints));
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
            .Where(filter => !string.IsNullOrWhiteSpace(filter) && CaseyOpenDataController.DatasetDefinitions.ContainsKey(filter))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        if (filters.Count == 0) return [];

        var places = new List<CaseyPlace>();

        foreach (var filter in filters)
        {
            // 1. First attempt to query the PostgreSQL database via CaseyDbContext
            CaseyPlace? nearestFromDb = await GetNearestAmenityFromDatabaseAsync(start, filter, targetDistanceMeters, places);

            if (nearestFromDb is not null)
            {
                places.Add(nearestFromDb);
                continue;
            }

            // 2. Fall back to Casey Open Data API
            var dataset = CaseyOpenDataController.DatasetDefinitions[filter];
            var url = $"https://data.casey.vic.gov.au/api/explore/v2.1/catalog/datasets/{dataset.DatasetId}/records?limit=100";

            try
            {
                var httpClient = _httpClientFactory.CreateClient();
                using var response = await httpClient.GetAsync(url);
                var content = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode) continue;

                using var document = JsonDocument.Parse(content);
                var datasetPlaces = CaseyOpenDataController.ParsePlaces(document.RootElement, dataset);

                var nearest = datasetPlaces
                    .Where(place => IsValidCoordinate(new RouteCoordinate { Lat = place.Lat, Lng = place.Lng }))
                    .Select(place => new
                    {
                        Place = place,
                        Distance = HaversineMeters(start.Lat, start.Lng, place.Lat, place.Lng)
                    })
                    .Where(x => x.Distance <= Math.Min(targetDistanceMeters * 0.35, 1000))
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

    private async Task<CaseyPlace?> GetNearestAmenityFromDatabaseAsync(
        RouteCoordinate start,
        string filter,
        double targetDistanceMeters,
        List<CaseyPlace> alreadySelected)
    {
        try
        {
            var connStr = _dbContext.Database.GetDbConnection().ConnectionString;
            if (!DatabaseAvailability.CanConnect(connStr))
            {
                return null;
            }

            var maxDistance = Math.Min(targetDistanceMeters * 0.35, 1000);

            switch (filter.ToLowerInvariant())
            {
                case "bbq":
                case "barbecue":
                {
                    var bbqs = await _dbContext.Bbqs.AsNoTracking().ToListAsync();
                    return bbqs
                        .Where(b => IsValidCoordinate(new RouteCoordinate { Lat = b.Latitude, Lng = b.Longitude }))
                        .Select(b => new
                        {
                            Place = new CaseyPlace
                            {
                                Id = $"bbq-db-{b.Id}",
                                Name = b.ReserveName ?? b.Address ?? "BBQ",
                                Type = "bbq",
                                DatasetId = "barbecue_pt_t1eam",
                                Lat = b.Latitude,
                                Lng = b.Longitude
                            },
                            Distance = HaversineMeters(start.Lat, start.Lng, b.Latitude, b.Longitude)
                        })
                        .Where(x => x.Distance <= maxDistance && !alreadySelected.Any(s => HaversineMeters(s.Lat, s.Lng, x.Place.Lat, x.Place.Lng) < 30))
                        .OrderBy(x => x.Distance)
                        .Select(x => x.Place)
                        .FirstOrDefault();
                }

                case "toilet":
                case "disabledtoilets":
                {
                    var toilets = await _dbContext.PublicToilets.AsNoTracking().ToListAsync();
                    return toilets
                        .Where(t => IsValidCoordinate(new RouteCoordinate { Lat = t.Latitude, Lng = t.Longitude }))
                        .Select(t => new
                        {
                            Place = new CaseyPlace
                            {
                                Id = $"toilet-db-{t.Id}",
                                Name = t.Name ?? t.Address ?? "Toilet",
                                Type = "toilet",
                                DatasetId = "public_toilet_block_pt_t1eam",
                                Lat = t.Latitude,
                                Lng = t.Longitude
                            },
                            Distance = HaversineMeters(start.Lat, start.Lng, t.Latitude, t.Longitude)
                        })
                        .Where(x => x.Distance <= maxDistance && !alreadySelected.Any(s => HaversineMeters(s.Lat, s.Lng, x.Place.Lat, x.Place.Lng) < 30))
                        .OrderBy(x => x.Distance)
                        .Select(x => x.Place)
                        .FirstOrDefault();
                }

                case "fountain":
                case "drinkingfountain":
                {
                    var fountains = await _dbContext.DrinkingFountains.AsNoTracking().ToListAsync();
                    return fountains
                        .Where(f => IsValidCoordinate(new RouteCoordinate { Lat = f.Latitude, Lng = f.Longitude }))
                        .Select(f => new
                        {
                            Place = new CaseyPlace
                            {
                                Id = $"fountain-db-{f.Id}",
                                Name = f.ParkReserveName ?? f.Address ?? "Drinking Fountain",
                                Type = "fountain",
                                DatasetId = "drinking_fountain_pt_t1eam",
                                Lat = f.Latitude,
                                Lng = f.Longitude
                            },
                            Distance = HaversineMeters(start.Lat, start.Lng, f.Latitude, f.Longitude)
                        })
                        .Where(x => x.Distance <= maxDistance && !alreadySelected.Any(s => HaversineMeters(s.Lat, s.Lng, x.Place.Lat, x.Place.Lng) < 30))
                        .OrderBy(x => x.Distance)
                        .Select(x => x.Place)
                        .FirstOrDefault();
                }

                case "bench":
                {
                    var benches = await _dbContext.Benches.AsNoTracking().ToListAsync();
                    return benches
                        .Where(b => IsValidCoordinate(new RouteCoordinate { Lat = b.Latitude, Lng = b.Longitude }))
                        .Select(b => new
                        {
                            Place = new CaseyPlace
                            {
                                Id = $"bench-db-{b.Id}",
                                Name = b.ReserveName ?? b.Address ?? "Bench",
                                Type = "bench",
                                DatasetId = "bench_seat_pt_t1eam",
                                Lat = b.Latitude,
                                Lng = b.Longitude
                            },
                            Distance = HaversineMeters(start.Lat, start.Lng, b.Latitude, b.Longitude)
                        })
                        .Where(x => x.Distance <= maxDistance && !alreadySelected.Any(s => HaversineMeters(s.Lat, s.Lng, x.Place.Lat, x.Place.Lng) < 30))
                        .OrderBy(x => x.Distance)
                        .Select(x => x.Place)
                        .FirstOrDefault();
                }

                case "library":
                {
                    var libraries = await _dbContext.Libraries.AsNoTracking().ToListAsync();
                    return libraries
                        .Where(l => IsValidCoordinate(new RouteCoordinate { Lat = l.Latitude, Lng = l.Longitude }))
                        .Select(l => new
                        {
                            Place = new CaseyPlace
                            {
                                Id = $"library-db-{l.Id}",
                                Name = l.Name ?? l.Address ?? "Library",
                                Type = "library",
                                DatasetId = "library_pt_t1eam",
                                Lat = l.Latitude,
                                Lng = l.Longitude
                            },
                            Distance = HaversineMeters(start.Lat, start.Lng, l.Latitude, l.Longitude)
                        })
                        .Where(x => x.Distance <= maxDistance && !alreadySelected.Any(s => HaversineMeters(s.Lat, s.Lng, x.Place.Lat, x.Place.Lng) < 30))
                        .OrderBy(x => x.Distance)
                        .Select(x => x.Place)
                        .FirstOrDefault();
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not query CaseyDbContext for filter {Filter}. Falling back to Open Data.", filter);
        }

        return null;
    }

    private static List<CaseyPlace> SortPlacesNearestNeighbor(RouteCoordinate start, List<CaseyPlace> places)
    {
        if (places.Count <= 1) return places;

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
                return (rootGeoJson, GetRouteSummary(rootGeoJson));
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
                    else break;
                }

                if (maxK >= 1)
                {
                    var tip = prunedCoords[i];
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
                return (rootGeoJson, GetRouteSummary(rootGeoJson));
            }

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
            return (doc.RootElement.Clone(), new RouteSummary(totalMeters, durationSecs));
        }
        catch
        {
            return (rootGeoJson, GetRouteSummary(rootGeoJson));
        }
    }

    private async Task<CustomWalkRouteResponse?> TryGetOsrmRouteAsync(
        CustomWalkRouteRequest request,
        List<RouteCoordinate> routePoints)
    {
        try
        {
            var coords = string.Join(";", routePoints.Select(p =>
                $"{p.Lng.ToString(System.Globalization.CultureInfo.InvariantCulture)},{p.Lat.ToString(System.Globalization.CultureInfo.InvariantCulture)}"));
            var url = $"https://routing.openstreetmap.de/routed-foot/route/v1/foot/{coords}?overview=full&geometries=geojson";

            var httpClient = _httpClientFactory.CreateClient();
            using var response = await httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode) return null;

            var content = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(content);
            if (!doc.RootElement.TryGetProperty("routes", out var routes) || routes.GetArrayLength() == 0)
                return null;

            var primaryRoute = routes[0];
            var distance = primaryRoute.GetProperty("distance").GetDouble();
            var duration = primaryRoute.GetProperty("duration").GetDouble();
            var geometry = primaryRoute.GetProperty("geometry");

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
                                distance = distance,
                                duration = duration
                            }
                        },
                        geometry = geometry
                    }
                }
            };

            var jsonString = JsonSerializer.Serialize(newGeoJsonObj);
            using var outDoc = JsonDocument.Parse(jsonString);

            return new CustomWalkRouteResponse
            {
                Title = request.Title,
                TargetDistanceKm = request.TargetDistanceKm,
                SelectedFilters = request.SelectedFilters ?? [],
                DistanceMeters = distance,
                DurationSeconds = duration,
                DistanceText = FormatDistance(distance),
                DurationText = FormatDuration(duration),
                Waypoints = routePoints,
                RouteGeoJson = outDoc.RootElement.Clone()
            };
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "OSRM fallback routing failed.");
            return null;
        }
    }

    private static CustomWalkRouteResponse GenerateSyntheticRouteResponse(
        CustomWalkRouteRequest request,
        List<RouteCoordinate> routePoints)
    {
        double totalMeters = 0;
        for (int i = 0; i < routePoints.Count - 1; i++)
        {
            totalMeters += HaversineMeters(routePoints[i].Lat, routePoints[i].Lng, routePoints[i + 1].Lat, routePoints[i + 1].Lng);
        }

        if (totalMeters <= 0 && request.TargetDistanceKm.HasValue)
        {
            totalMeters = request.TargetDistanceKm.Value * 1000;
        }

        double durationSeconds = totalMeters / 1.35;

        var geoJsonObj = new
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
                            duration = durationSeconds
                        }
                    },
                    geometry = new
                    {
                        type = "LineString",
                        coordinates = routePoints.Select(p => new[] { p.Lng, p.Lat }).ToArray()
                    }
                }
            }
        };

        var jsonString = JsonSerializer.Serialize(geoJsonObj);
        using var doc = JsonDocument.Parse(jsonString);

        return new CustomWalkRouteResponse
        {
            Title = request.Title,
            TargetDistanceKm = request.TargetDistanceKm,
            SelectedFilters = request.SelectedFilters ?? [],
            DistanceMeters = totalMeters,
            DurationSeconds = durationSeconds,
            DistanceText = FormatDistance(totalMeters),
            DurationText = FormatDuration(durationSeconds),
            Waypoints = routePoints,
            RouteGeoJson = doc.RootElement.Clone()
        };
    }

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
}

public class CustomWalkRouteRequest
{
    public string? Title { get; set; }
    public double? TargetDistanceKm { get; set; }
    public List<string>? SelectedFilters { get; set; }
    public RouteCoordinate? Start { get; set; }
    public RouteCoordinate? End { get; set; }
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
