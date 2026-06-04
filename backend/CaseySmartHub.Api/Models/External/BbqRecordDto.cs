using System.Text.Json.Serialization;
using CaseySmartHub.Api.Models.Common;

namespace CaseySmartHub.Api.Models.External;

public sealed class BbqRecordDto
{
    [JsonPropertyName("geo_point_2d")]
    public GeoPoint2d? GeoPoint { get; init; }

    [JsonPropertyName("gisfid")]
    public int? Gisfid { get; init; }

    [JsonPropertyName("ward")]
    public string? Ward { get; init; }

    [JsonPropertyName("suburb")]
    public string? Suburb { get; init; }

    [JsonPropertyName("reserve_name")]
    public string? ReserveName { get; init; }

    [JsonPropertyName("propertyaddress")]
    public string? Address { get; init; }

    [JsonPropertyName("facility")]
    public string? Facility { get; init; }

    [JsonPropertyName("quantity")]
    public int? Quantity { get; init; }

    [JsonPropertyName("postcode")]
    public string? Postcode { get; init; }

}


