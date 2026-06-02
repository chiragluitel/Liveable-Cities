using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace CaseySmartHub.Api.Controllers;

[ApiController]
[Route("api/custom-walk-route")]
public class CustomWalkRouteController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;
    private readonly ILogger<CustomWalkRouteController> _logger;

    public CustomWalkRouteController(
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration,
        ILogger<CustomWalkRouteController> logger)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> GetCustomWalkRoute([FromBody] CustomWalkRouteRequest request)
    {
        if (request.Start is null || request.End is null)
        {
            return BadRequest(new
            {
                message = "Start and end coordinates are required."
            });
        }

        if (!IsValidCoordinate(request.Start) || !IsValidCoordinate(request.End))
        {
            return BadRequest(new
            {
                message = "Invalid latitude or longitude values."
            });
        }

        var apiKey = _configuration["OpenRouteService:ApiKey"];

        if (string.IsNullOrWhiteSpace(apiKey))
        {
            return StatusCode(500, new
            {
                message = "OpenRouteService API key is not configured on the backend."
            });
        }

        var orsRequest = new
        {
            coordinates = new[]
            {
                new[] { request.Start.Lng, request.Start.Lat },
                new[] { request.End.Lng, request.End.Lat }
            },
            instructions = true
        };

        var httpClient = _httpClientFactory.CreateClient();

        using var httpRequest = new HttpRequestMessage(
            HttpMethod.Post,
            "https://api.openrouteservice.org/v2/directions/foot-walking/geojson"
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
            var routeGeoJson = document.RootElement.Clone();

            var summary = GetRouteSummary(routeGeoJson);

            return Ok(new CustomWalkRouteResponse
            {
                Title = request.Title,
                TargetDistanceKm = request.TargetDistanceKm,
                SelectedFilters = request.SelectedFilters ?? [],
                DistanceMeters = summary.DistanceMeters,
                DurationSeconds = summary.DurationSeconds,
                DistanceText = FormatDistance(summary.DistanceMeters),
                DurationText = FormatDuration(summary.DurationSeconds),
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

    private static bool IsValidCoordinate(RouteCoordinate coordinate)
    {
        return coordinate.Lat >= -90 &&
               coordinate.Lat <= 90 &&
               coordinate.Lng >= -180 &&
               coordinate.Lng <= 180;
    }

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

    public JsonElement RouteGeoJson { get; set; }
}

public record RouteSummary(double DistanceMeters, double DurationSeconds);