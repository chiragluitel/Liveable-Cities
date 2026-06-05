using CaseySmartHub.Api.Clients;
using CaseySmartHub.Api.Mapping;
using CaseySmartHub.Api.Models.Common;
using CaseySmartHub.Api.Models.Entities;
using CaseySmartHub.Api.Models.External;
using Microsoft.Extensions.Caching.Memory;

namespace CaseySmartHub.Api.Services;

public sealed class PublicToiletService : IPublicToiletService
{
    private const string DatasetId = "public_toilet_block_pt_t1eam";
    private const string CacheKey = "toilets";
    private static readonly TimeSpan CacheTtl = TimeSpan.FromHours(6);

    private readonly CaseyOpenDataClient _client;
    private readonly IMemoryCache _cache;

    public PublicToiletService(CaseyOpenDataClient client, IMemoryCache cache)
    {
        _client = client;
        _cache = cache;
    }

    public async Task<CaseyDataResponse<PublicToilet>> GetPublicToiletsAsync(CancellationToken cancellationToken = default)
    {
        var toilets
         = await _cache.GetOrCreateAsync(CacheKey, async entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = CacheTtl;
            var records = await _client.GetAllRecordsAsync<PublicToiletRecordDto>(DatasetId, cancellationToken);
            return records.Select(record => record.ToPublicToilet()).ToList();
        }) ?? new List<PublicToilet>();

        return new CaseyDataResponse<PublicToilet>
        {
            TotalCount = toilets.Count,
            Results = toilets,
        };
    }
}
