using System.Text.Json.Serialization;
using CaseySmartHub.Api.Models.Common;

namespace CaseySmartHub.Api.Models.External;

public sealed class LibraryRecordDto
{
    [JsonPropertyName("geo_point_2d")]
    public GeoPoint2d? GeoPoint {get; init;}

    [JsonPropertyName("name")]
    public string? Name {get; init;}

    [JsonPropertyName("streetno")]
    public string? Address {get; init;}

    [JsonPropertyName("postcode")]
    public string? Postcode {get; init;}

    [JsonPropertyName("descript")]
    public string? Description {get; init;}

    [JsonPropertyName("phoneno")]
    public string? Phone {get; init;}

    [JsonPropertyName("website")]
    public string? Website {get; init;}

    [JsonPropertyName("email")]
    public string? Email {get; init;}

    [JsonPropertyName("openinghrs")]
    public string? OpeningHours {get; init;}

    [JsonPropertyName("category")]
    public string? Category {get; init;}
}