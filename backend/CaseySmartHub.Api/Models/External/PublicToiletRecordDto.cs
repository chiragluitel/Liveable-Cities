using System.Text.Json.Serialization;
using CaseySmartHub.Api.Models.Common;

namespace CaseySmartHub.Api.Models.External;

public sealed class PublicToiletRecordDto
{
    [JsonPropertyName("geo_point_2d")]
    public GeoPoint2d? GeoPoint { get; init; }

    [JsonPropertyName("gisfid")]
    public int? Gisfid {get; init;} 

    [JsonPropertyName("ward")]
    public string? Ward {get; init;}

    [JsonPropertyName("suburb")]
    public string? Suburb {get; init;}

    [JsonPropertyName("name")]
    public string? Name {get; init;}

    [JsonPropertyName("propertyaddress")]
    public string? Address {get; init;}

    [JsonPropertyName("facility")]
    public string? Facility {get; init;}

    [JsonPropertyName("funcuse")]
    public string? Function {get; init;}

    [JsonPropertyName("postcode")]
    public string? Postcode {get; init;}
}