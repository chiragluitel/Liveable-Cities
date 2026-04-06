using System.Net.Http.Json;
using Microsoft.Extensions.Logging;

namespace CaseySmartHub.Infrastructure.ExternalData.CaseyOpenData;

public class CaseyOpenDataClientBase
{
    private readonly HttpClient _httpClient;
    private readonly ILogger _logger;

    public CaseyOpenDataClientBase(HttpClient httpClient, ILogger<CaseyOpenDataClientBase> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }

#region Record Endpoints (The Data inside a Dataset)

    /// Fetches a LIST of records (e.g., "Give me all permits in Cranbourne").
    /// Includes pagination (limit and offset) so not to overload memory.
    public async Task<List<T>> FetchRecordsAsync<T>(string datasetId, string? whereClause = null, int limit = 10, int offset = 0, CancellationToken cancellationToken = default)
    {
        try
        {
            var url = $"catalog/datasets/{datasetId}/records?limit={limit}&offset={offset}";
            
            if (!string.IsNullOrWhiteSpace(whereClause))
            {
                url += $"&where={Uri.EscapeDataString(whereClause)}";
            }

            var response = await _httpClient.GetFromJsonAsync<OdsResponse<T>>(url, cancellationToken);
            return response?.Results ?? new List<T>();
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Failed to fetch records for dataset: {DatasetId}. Where: {WhereClause}", datasetId, whereClause);
            throw; 
        }
    }

    /// Fetches a SINGLE specific record (e.g., "Give me Permit Number BPP123").
    /// Hardcodes limit=1 for efficiency.
    public async Task<T?> FetchSpecificRecordAsync<T>(string datasetId, string whereClause, CancellationToken cancellationToken = default)
    {
        // Re-use the list function but force limit = 1
        var results = await FetchRecordsAsync<T>(datasetId, whereClause, limit: 1, offset: 0, cancellationToken);
        return results.FirstOrDefault();
    }

    #endregion

    #region Catalog Endpoints (Metadata about the Datasets)

    /// Lists available datasets in the Casey catalog.
    /// Useful if you want to dynamically discover new data feeds.
    public async Task<List<T>> FetchDatasetsAsync<T>(string? search = null, int limit = 10, int offset = 0, CancellationToken cancellationToken = default)
    {
        try
        {
            var url = $"catalog/datasets?limit={limit}&offset={offset}";
            
            if (!string.IsNullOrWhiteSpace(search))
            {
                url += $"&search={Uri.EscapeDataString(search)}";
            }

            var response = await _httpClient.GetFromJsonAsync<OdsResponse<T>>(url, cancellationToken);
            return response?.Results ?? new List<T>();
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Failed to fetch datasets catalog.");
            throw;
        }
    }

    /// Gets metadata for one specific dataset (e.g., finding out when 'Drinking Fountains' was last updated).
    public async Task<T?> FetchDatasetInfoAsync<T>(string datasetId, CancellationToken cancellationToken = default)
    {
        try
        {
            var url = $"catalog/datasets/{datasetId}";
            return await _httpClient.GetFromJsonAsync<T>(url, cancellationToken);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Failed to fetch info for dataset: {DatasetId}", datasetId);
            throw;
        }
    }

    #endregion

}