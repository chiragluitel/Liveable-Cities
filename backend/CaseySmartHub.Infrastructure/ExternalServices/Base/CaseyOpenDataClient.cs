using System.Net.Http.Json;

namespace CaseySmartHub.Infrastructure.ExternalServices.Base;

public class CaseyOpenDataClient
{
    private readonly HttpClient _httpClient;
    private const string BaseUrl = "https://data.casey.vic.gov.au/api/explore/v2.1/catalog/datasets";

    public CaseyOpenDataClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<T?> FetchSingleRecordAsync<T>(string datasetId, string whereClause, CancellationToken cancellationToken)
    {
        var url = $"{BaseUrl}/{datasetId}/records?where={whereClause}&limit=1";
        var response = await _httpClient.GetAsync(url, cancellationToken);
        
        if (!response.IsSuccessStatusCode)
            return default;

        var data = await response.Content.ReadFromJsonAsync<CaseyApiResponse<T>>(cancellationToken: cancellationToken);

        if (data == null || data.Results == null || !data.Results.Any())
            return default;

        return data.Results.First();
    }
    private class CaseyApiResponse<T>
    {
        public List<T>? Results { get; set; }
    }
}