using System.Text.Json.Serialization;

namespace CaseySmartHub.Infrastructure.ExternalData.CaseyOpenData;

public class OdsResponse<T>
{
    [JsonPropertyName("total_count")]
    public int TotalCount { get; set; }

    [JsonPropertyName("results")]
    public List<T> Results { get; set; } = new();
}