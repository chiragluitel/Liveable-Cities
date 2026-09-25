namespace CaseySmartHub.Api.Models.Common;
public sealed class PlaceSearchResult
{
    public string Id { get; init; } = string.Empty;

    public string Title { get; init; } = string.Empty;

    public string StreetAddress { get; init; } = string.Empty;

    public string Suburb { get; init; } = string.Empty;

    public string State { get; init; } = string.Empty;

    public string Country { get; init; } = string.Empty;

    public double Latitude { get; init; }
    public double Longitude { get; init; }

    // Source dataset, e.g. "library"
    public string Type { get; init; } = string.Empty;
}
