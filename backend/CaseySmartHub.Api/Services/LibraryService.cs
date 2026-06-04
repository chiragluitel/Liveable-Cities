using CaseySmartHub.Api.Clients;
using CaseySmartHub.Api.Mapping;
using CaseySmartHub.Api.Models.Common;
using CaseySmartHub.Api.Models.Entities;
using CaseySmartHub.Api.Models.External;
using Microsoft.Extensions.Caching.Memory;

namespace CaseySmartHub.Api.Services;

public sealed class LibraryService : ILibraryService
{
    private const string DatasetId = "libraries-copy";
    private const string CacheKey = "libraries";
    private static readonly TimeSpan CacheTtl = TimeSpan.FromHours(6);

    private readonly CaseyOpenDataClient _client;
    private readonly IMemoryCache _cache;

    public LibraryService(CaseyOpenDataClient client, IMemoryCache cache)
    {
        _client = client;
        _cache = cache;
    }

    public async Task<CaseyDataResponse<Library>> GetLibrariesAsync(CancellationToken cancellationToken = default)
    {
        var libraries = await _cache.GetOrCreateAsync(CacheKey, async entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = CacheTtl;

            var records = await _client.GetAllRecordsAsync<LibraryRecordDto>(
                DatasetId,
                cancellationToken);

            return records.Select(r => r.ToLibrary()).ToList();
        }) ?? new List<Library>();

        return new CaseyDataResponse<Library>
        {
            TotalCount = libraries.Count,
            Results = libraries
        };
    }
}