using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace CaseySmartHub.Api.Controllers;

[ApiController]
[Route("api/casey-open-data")]
public class CaseyOpenDataController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<CaseyOpenDataController> _logger;

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

    public CaseyOpenDataController(IHttpClientFactory httpClientFactory, ILogger<CaseyOpenDataController> logger)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
    }

    [HttpGet("places")]
    public async Task<IActionResult> GetPlaces([FromQuery] string? filters = null, [FromQuery] int limit = 100)
    {
        var selectedFilters = (filters ?? "bbq,offLeash,toilet")
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Where(f => DatasetDefinitions.ContainsKey(f))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        if (selectedFilters.Count == 0)
        {
            return Ok(Array.Empty<CaseyPlace>());
        }

        var httpClient = _httpClientFactory.CreateClient();
        var places = new List<CaseyPlace>();

        foreach (var filter in selectedFilters)
        {
            var dataset = DatasetDefinitions[filter];
            var requestUrl = $"https://data.casey.vic.gov.au/api/explore/v2.1/catalog/datasets/{dataset.DatasetId}/records?limit={Math.Clamp(limit, 1, 100)}";

            try
            {
                using var response = await httpClient.GetAsync(requestUrl);
                var content = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning("Casey open data request failed for {DatasetId}. Status: {StatusCode}. Response: {Response}", dataset.DatasetId, response.StatusCode, content);
                    continue;
                }

                using var document = JsonDocument.Parse(content);
                places.AddRange(ParsePlaces(document.RootElement, dataset));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading Casey open data dataset {DatasetId}", dataset.DatasetId);
            }
        }

        return Ok(places);
    }

    public static List<CaseyPlace> ParsePlaces(JsonElement root, CaseyDatasetDefinition dataset)
    {
        var places = new List<CaseyPlace>();

        if (!root.TryGetProperty("results", out var results) || results.ValueKind != JsonValueKind.Array)
        {
            return places;
        }

        var index = 0;
        foreach (var record in results.EnumerateArray())
        {
            if (!TryGetCoordinate(record, out var lat, out var lng))
            {
                continue;
            }

            var name = TryGetFirstString(record,
                "name", "asset_name", "site_name", "reserve_name", "park_name", "facility_name", "location", "asset_description")
                ?? dataset.DefaultLabel;

            places.Add(new CaseyPlace
            {
                Id = $"{dataset.IconType}-{index++}-{Math.Round(lat, 6)}-{Math.Round(lng, 6)}",
                Name = name,
                Type = dataset.IconType,
                DatasetId = dataset.DatasetId,
                Lat = lat,
                Lng = lng
            });
        }

        return places;
    }

    public static bool TryGetCoordinate(JsonElement record, out double lat, out double lng)
    {
        lat = 0;
        lng = 0;

        if (TryReadGeoPoint(record, "geo_point_2d", out lat, out lng) ||
            TryReadGeoPoint(record, "geopoint", out lat, out lng) ||
            TryReadGeoPoint(record, "geo_point", out lat, out lng))
        {
            return true;
        }

        if (TryReadGeometry(record, "geo_shape", out lat, out lng) ||
            TryReadGeometry(record, "geoshape", out lat, out lng) ||
            TryReadGeometry(record, "geometry", out lat, out lng))
        {
            return true;
        }

        foreach (var property in record.EnumerateObject())
        {
            if (property.Value.ValueKind == JsonValueKind.Object &&
                (TryReadGeoPoint(property.Value, null, out lat, out lng) || TryReadGeometry(property.Value, null, out lat, out lng)))
            {
                return true;
            }
        }

        return false;
    }

    private static bool TryReadGeoPoint(JsonElement record, string? propertyName, out double lat, out double lng)
    {
        lat = 0;
        lng = 0;

        var point = record;
        if (propertyName is not null && (!record.TryGetProperty(propertyName, out point) || point.ValueKind != JsonValueKind.Object))
        {
            return false;
        }

        if (TryGetDouble(point, "lat", out lat) && (TryGetDouble(point, "lon", out lng) || TryGetDouble(point, "lng", out lng)))
        {
            return true;
        }

        return false;
    }

    private static bool TryReadGeometry(JsonElement record, string? propertyName, out double lat, out double lng)
    {
        lat = 0;
        lng = 0;

        var geometry = record;
        if (propertyName is not null && (!record.TryGetProperty(propertyName, out geometry) || geometry.ValueKind != JsonValueKind.Object))
        {
            return false;
        }

        if (!geometry.TryGetProperty("geometry", out var nestedGeometry))
        {
            nestedGeometry = geometry;
        }

        if (!nestedGeometry.TryGetProperty("coordinates", out var coordinates))
        {
            return false;
        }

        var points = new List<(double Lat, double Lng)>();
        CollectCoordinatePairs(coordinates, points);

        if (points.Count == 0)
        {
            return false;
        }

        lat = points.Average(p => p.Lat);
        lng = points.Average(p => p.Lng);
        return true;
    }

    private static void CollectCoordinatePairs(JsonElement element, List<(double Lat, double Lng)> points)
    {
        if (element.ValueKind != JsonValueKind.Array)
        {
            return;
        }

        var array = element.EnumerateArray().ToList();
        if (array.Count >= 2 && array[0].ValueKind == JsonValueKind.Number && array[1].ValueKind == JsonValueKind.Number)
        {
            var lng = array[0].GetDouble();
            var lat = array[1].GetDouble();
            points.Add((lat, lng));
            return;
        }

        foreach (var child in array)
        {
            CollectCoordinatePairs(child, points);
        }
    }

    private static bool TryGetDouble(JsonElement element, string propertyName, out double value)
    {
        value = 0;
        if (!element.TryGetProperty(propertyName, out var property))
        {
            return false;
        }

        if (property.ValueKind == JsonValueKind.Number)
        {
            value = property.GetDouble();
            return true;
        }

        if (property.ValueKind == JsonValueKind.String && double.TryParse(property.GetString(), out value))
        {
            return true;
        }

        return false;
    }

    private static string? TryGetFirstString(JsonElement record, params string[] names)
    {
        foreach (var name in names)
        {
            if (record.TryGetProperty(name, out var property) && property.ValueKind == JsonValueKind.String)
            {
                var value = property.GetString();
                if (!string.IsNullOrWhiteSpace(value))
                {
                    return value;
                }
            }
        }

        return null;
    }
}

public record CaseyDatasetDefinition(string DatasetId, string IconType, string DefaultLabel);

public class CaseyPlace
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string DatasetId { get; set; } = string.Empty;
    public double Lat { get; set; }
    public double Lng { get; set; }
}
