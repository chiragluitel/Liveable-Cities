using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace CaseySmartHub.Api.Clients;

public sealed class CaseyOpenDataClient
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        NumberHandling = JsonNumberHandling.AllowReadingFromString,
    };

    private readonly HttpClient _http;

    public CaseyOpenDataClient(HttpClient http) => _http = http;

    public async Task<IReadOnlyList<T>> GetAllRecordsAsync<T>(
        string datasetId,
        CancellationToken cancellationToken = default)
    {
        var records = await _http.GetFromJsonAsync<List<T>>(
            $"{datasetId}/exports/json",
            JsonOptions,
            cancellationToken);

        return records ?? [];
    }
}
