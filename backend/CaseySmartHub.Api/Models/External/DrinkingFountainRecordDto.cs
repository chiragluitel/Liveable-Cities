using System.Text.Json.Serialization;
using CaseySmartHub.Api.Models.Common;

namespace CaseySmartHub.Api.Models.External;
public sealed class DrinkingFountainRecordDto
{
    [JsonPropertyName("geo_point_2d")]
    public GeoPoint2d? GeoPoint { get; init; }

    [JsonPropertyName("gisfid")]
    public int? GisFid { get; init; }

    [JsonPropertyName("ward")]
    public string? Ward { get; init; }

    [JsonPropertyName("suburb")]
    public string? Suburb { get; init; }

    [JsonPropertyName("parkreservename")]
    public string? ParkReserveName { get; init; }

    [JsonPropertyName("address")]
    public string? Address { get; init; }

    [JsonPropertyName("featuretype")]
    public string? FeatureType { get; init; }

    [JsonPropertyName("dftype")]
    public string? FountainType { get; init; }

    [JsonPropertyName("dfmaterial")]
    public string? Material { get; init; }

    [JsonPropertyName("condition")]
    public string? Condition { get; init; }

    [JsonPropertyName("postcode")]
    public string? Postcode { get; init; }
}
