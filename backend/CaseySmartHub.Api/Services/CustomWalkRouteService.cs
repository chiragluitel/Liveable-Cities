using System.Net.Http.Json;
using System.Text.Json;
using CaseySmartHub.Api.Configuration;
using CaseySmartHub.Api.Models.Routing;
using Microsoft.Extensions.Options;

namespace CaseySmartHub.Api.Services;

public sealed class CustomWalkRouteService : ICustomWalkRouteService
{
    private const string DirectionsEndpoint = "/v2/directions/foot-walking/geojson";
    private const int MaxAttempts = 3;
    private const double DistanceTolerancePercent = 0.20;

    private readonly HttpClient _httpClient;
    private readonly OpenRouteServiceOptions _options;
    private readonly ILogger<CustomWalkRouteService> _logger;

    public CustomWalkRouteService(
        HttpClient httpClient,
        IOptions<OpenRouteServiceOptions> options,
        ILogger<CustomWalkRouteService> logger)
    {
        _httpClient = httpClient;
        _options = options.Value;
        _logger = logger;
    }

    public async Task<CustomWalkRouteResponse> GetCustomWalkRouteAsync(
        CustomWalkRouteRequest request,
        CancellationToken cancellationToken = default)
    {
        ValidateRequest(request);

        if (string.IsNullOrWhiteSpace(_options.ApiKey))
        {
            throw new InvalidOperationException("OpenRouteService API key is not configured.");
        }

        var targetDistanceMeters = request.TargetDistanceKm * 1000;
        var useNativeRoundTrip = request.SelectedFilters.Count == 0 && request.Waypoints.Count == 0;

        var bestRoute = await GetBestRouteAsync(
            request,
            targetDistanceMeters,
            useNativeRoundTrip,
            cancellationToken);

        return new CustomWalkRouteResponse
        {
            Title = request.Title,
            TargetDistanceKm = request.TargetDistanceKm,
            SelectedFilters = request.SelectedFilters,
            DistanceMeters = bestRoute.Summary.DistanceMeters,
            DurationSeconds = bestRoute.Summary.DurationSeconds,
            DistanceText = FormatDistance(bestRoute.Summary.DistanceMeters),
            DurationText = FormatDuration(bestRoute.Summary.DurationSeconds),
            AttemptsUsed = bestRoute.AttemptsUsed,
            UsedNativeRoundTrip = useNativeRoundTrip,
            RouteGeoJson = bestRoute.RouteGeoJson
        };
    }

    private async Task<RouteCandidate> GetBestRouteAsync(
        CustomWalkRouteRequest request,
        double targetDistanceMeters,
        bool useNativeRoundTrip,
        CancellationToken cancellationToken)
    {
        RouteCandidate? bestCandidate = null;
        var radiusMultiplier = 1.0;

        for (var attempt = 1; attempt <= MaxAttempts; attempt++)
        {
            var payload = useNativeRoundTrip
                ? BuildNativeRoundTripPayload(request, targetDistanceMeters, attempt)
                : BuildWaypointLoopPayload(request, targetDistanceMeters, radiusMultiplier);

            var candidate = await RequestRouteAsync(payload, attempt, cancellationToken);

            if (bestCandidate is null ||
                GetDistanceDifference(candidate.Summary.DistanceMeters, targetDistanceMeters) <
                GetDistanceDifference(bestCandidate.Summary.DistanceMeters, targetDistanceMeters))
            {
                bestCandidate = candidate;
            }

            if (IsWithinTolerance(candidate.Summary.DistanceMeters, targetDistanceMeters))
            {
                return candidate;
            }

            if (candidate.Summary.DistanceMeters < targetDistanceMeters)
            {
                radiusMultiplier *= 1.5;
            }
            else
            {
                radiusMultiplier *= 0.75;
            }
        }

        return bestCandidate ?? throw new InvalidOperationException("OpenRouteService did not return a valid route.");
    }

    private object BuildNativeRoundTripPayload(
        CustomWalkRouteRequest request,
        double targetDistanceMeters,
        int seed)
    {
        var start = request.Start!;

        return new
        {
            coordinates = new[]
            {
                new[] { start.Lng, start.Lat }
            },
            instructions = true,
            options = new
            {
                round_trip = new
                {
                    length = Math.Round(targetDistanceMeters),
                    points = 4,
                    seed
                }
            }
        };
    }

    private object BuildWaypointLoopPayload(
        CustomWalkRouteRequest request,
        double targetDistanceMeters,
        double radiusMultiplier)
    {
        var routePoints = BuildRoutePoints(request, targetDistanceMeters, radiusMultiplier);

        return new
        {
            coordinates = routePoints
                .Select(point => new[] { point.Lng, point.Lat })
                .ToArray(),
            instructions = true
        };
    }

    private static List<RouteCoordinate> BuildRoutePoints(
        CustomWalkRouteRequest request,
        double targetDistanceMeters,
        double radiusMultiplier)
    {
        var start = request.Start!;
        var routePoints = new List<RouteCoordinate> { start };

        foreach (var waypoint in request.Waypoints.Where(IsValidCoordinate))
        {
            if (!IsSameCoordinate(routePoints.Last(), waypoint))
            {
                routePoints.Add(waypoint);
            }
        }

        if (request.End is not null &&
            IsValidCoordinate(request.End) &&
            !IsSameCoordinate(routePoints.Last(), request.End))
        {
            routePoints.Add(request.End);
        }

        var loopRadiusMeters = CalculateLoopRadius(targetDistanceMeters, radiusMultiplier);
        var baseBearing = routePoints.Count > 1
            ? CalculateBearing(start, routePoints[^1])
            : 90;

        var turningPoints = GenerateLoopTurningPoints(start, loopRadiusMeters, baseBearing);

        foreach (var turningPoint in turningPoints)
        {
            if (!IsSameCoordinate(routePoints.Last(), turningPoint))
            {
                routePoints.Add(turningPoint);
            }
        }

        if (!IsSameCoordinate(routePoints.Last(), start))
        {
            routePoints.Add(start);
        }

        return routePoints;
    }

    private static RouteCoordinate[] GenerateLoopTurningPoints(
        RouteCoordinate start,
        double radiusMeters,
        double baseBearing)
    {
        return
        [
            OffsetCoordinate(start, radiusMeters, baseBearing + 60),
            OffsetCoordinate(start, radiusMeters, baseBearing + 120)
        ];
    }

    private async Task<RouteCandidate> RequestRouteAsync(
        object payload,
        int attempt,
        CancellationToken cancellationToken)
    {
        using var httpRequest = new HttpRequestMessage(HttpMethod.Post, DirectionsEndpoint);

        if (!httpRequest.Headers.TryAddWithoutValidation("Authorization", _options.ApiKey))
        {
            throw new InvalidOperationException("Could not add OpenRouteService authorization header.");
        }

        httpRequest.Content = JsonContent.Create(payload);

        using var response = await _httpClient.SendAsync(httpRequest, cancellationToken);
        var responseContent = await response.Content.ReadAsStringAsync(cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogWarning(
                "OpenRouteService request failed. Status: {StatusCode}, Response: {Response}",
                response.StatusCode,
                responseContent);

            throw new HttpRequestException(
                $"OpenRouteService request failed with status code {(int)response.StatusCode}.",
                null,
                response.StatusCode);
        }

        using var document = JsonDocument.Parse(responseContent);
        var routeGeoJson = document.RootElement.Clone();
        var summary = GetRouteSummary(routeGeoJson);

        return new RouteCandidate(routeGeoJson, summary, attempt);
    }

    private static void ValidateRequest(CustomWalkRouteRequest request)
    {
        if (request.Start is null)
        {
            throw new ArgumentException("Start coordinate is required.");
        }

        if (!IsValidCoordinate(request.Start))
        {
            throw new ArgumentException("Start coordinate is invalid.");
        }

        if (request.TargetDistanceKm <= 0)
        {
            throw new ArgumentException("Target distance must be greater than zero.");
        }
    }

    private static bool IsValidCoordinate(RouteCoordinate coordinate)
    {
        return coordinate.Lat is >= -90 and <= 90 &&
               coordinate.Lng is >= -180 and <= 180;
    }

    private static RouteSummary GetRouteSummary(JsonElement routeGeoJson)
    {
        var summary = routeGeoJson
            .GetProperty("features")[0]
            .GetProperty("properties")
            .GetProperty("summary");

        return new RouteSummary(
            summary.GetProperty("distance").GetDouble(),
            summary.GetProperty("duration").GetDouble());
    }

    private static double CalculateLoopRadius(double targetDistanceMeters, double radiusMultiplier)
    {
        var estimatedRadius = targetDistanceMeters / 3.5 * radiusMultiplier;
        return Math.Clamp(estimatedRadius, 250, 5000);
    }

    private static RouteCoordinate OffsetCoordinate(
        RouteCoordinate origin,
        double distanceMeters,
        double bearingDegrees)
    {
        const double earthRadiusMeters = 6371000;

        var bearing = DegreesToRadians(NormalizeBearing(bearingDegrees));
        var angularDistance = distanceMeters / earthRadiusMeters;

        var originLat = DegreesToRadians(origin.Lat);
        var originLng = DegreesToRadians(origin.Lng);

        var destinationLat = Math.Asin(
            Math.Sin(originLat) * Math.Cos(angularDistance) +
            Math.Cos(originLat) * Math.Sin(angularDistance) * Math.Cos(bearing));

        var destinationLng = originLng + Math.Atan2(
            Math.Sin(bearing) * Math.Sin(angularDistance) * Math.Cos(originLat),
            Math.Cos(angularDistance) - Math.Sin(originLat) * Math.Sin(destinationLat));

        return new RouteCoordinate
        {
            Lat = RadiansToDegrees(destinationLat),
            Lng = RadiansToDegrees(destinationLng)
        };
    }

    private static double CalculateBearing(RouteCoordinate start, RouteCoordinate end)
    {
        var startLat = DegreesToRadians(start.Lat);
        var endLat = DegreesToRadians(end.Lat);
        var differenceLng = DegreesToRadians(end.Lng - start.Lng);

        var y = Math.Sin(differenceLng) * Math.Cos(endLat);
        var x = Math.Cos(startLat) * Math.Sin(endLat) -
                Math.Sin(startLat) * Math.Cos(endLat) * Math.Cos(differenceLng);

        return NormalizeBearing(RadiansToDegrees(Math.Atan2(y, x)));
    }

    private static double GetDistanceDifference(double routeDistanceMeters, double targetDistanceMeters)
    {
        return Math.Abs(routeDistanceMeters - targetDistanceMeters);
    }

    private static bool IsWithinTolerance(double routeDistanceMeters, double targetDistanceMeters)
    {
        var difference = GetDistanceDifference(routeDistanceMeters, targetDistanceMeters);
        return difference <= targetDistanceMeters * DistanceTolerancePercent;
    }

    private static bool IsSameCoordinate(RouteCoordinate first, RouteCoordinate second)
    {
        return Math.Abs(first.Lat - second.Lat) < 0.000001 &&
               Math.Abs(first.Lng - second.Lng) < 0.000001;
    }

    private static double NormalizeBearing(double bearing)
    {
        return (bearing % 360 + 360) % 360;
    }

    private static double DegreesToRadians(double degrees)
    {
        return degrees * Math.PI / 180;
    }

    private static double RadiansToDegrees(double radians)
    {
        return radians * 180 / Math.PI;
    }

    private static string FormatDistance(double meters)
    {
        return meters <= 0 ? "0 km" : $"{meters / 1000:0.0} km";
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

    private sealed record RouteCandidate(
        JsonElement RouteGeoJson,
        RouteSummary Summary,
        int AttemptsUsed);

    private sealed record RouteSummary(
        double DistanceMeters,
        double DurationSeconds);
}