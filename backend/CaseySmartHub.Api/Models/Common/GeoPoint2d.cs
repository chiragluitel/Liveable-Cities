using System.Text.Json.Serialization;

namespace CaseySmartHub.Api.Models.Common;

public sealed class GeoPoint2d
{
    [JsonPropertyName("lon")]
    public double Lon { get; init; }

    [JsonPropertyName("lat")]
    public double Lat { get; init; }
}
