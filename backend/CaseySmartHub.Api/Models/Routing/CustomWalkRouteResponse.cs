using System.Text.Json;

namespace CaseySmartHub.Api.Models.Routing;

public sealed class CustomWalkRouteResponse
{
    public string? Title { get; set; }

    public double TargetDistanceKm { get; set; }

    public List<string> SelectedFilters { get; set; } = [];

    public double DistanceMeters { get; set; }

    public double DurationSeconds { get; set; }

    public string DistanceText { get; set; } = string.Empty;

    public string DurationText { get; set; } = string.Empty;

    public int AttemptsUsed { get; set; }

    public bool UsedNativeRoundTrip { get; set; }

    public JsonElement RouteGeoJson { get; set; }
}