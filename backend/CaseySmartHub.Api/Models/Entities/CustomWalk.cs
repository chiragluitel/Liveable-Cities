namespace CaseySmartHub.Api.Models.Entities;

public sealed class CustomWalk
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public double Distance { get; set; }
    public bool HasWaterFountain { get; set; }
    public bool HasDisabledToilets { get; set; }
    public bool HasPark { get; set; }
    public bool HasPlayground { get; set; }
    public bool HasWellLitStreets { get; set; }
    public bool HasRubbishBin { get; set; }
    public bool HasOffLeash { get; set; }
    public bool HasBbq { get; set; }

    public List<string> SelectedFilters { get; set; } = [];

    public double? RouteDistanceMeters { get; set; }
    public double? RouteDurationSeconds { get; set; }
    public string? RouteDistanceText { get; set; }
    public string? RouteDurationText { get; set; }

    public string? RouteGeoJson { get; set; }

    // Set when the walk was downloaded from the community hub.
    public bool FromCommunity { get; set; }
    public string? CommunityWalkId { get; set; }
    public string? RouteId { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
