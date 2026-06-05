using CaseySmartHub.Api.Clients;
using CaseySmartHub.Api.Mapping;
using CaseySmartHub.Api.Models.Common;
using CaseySmartHub.Api.Models.Entities;
using CaseySmartHub.Api.Models.External;
using Microsoft.Extensions.Caching.Memory;

namespace CaseySmartHub.Api.Services;

public sealed class BbqService : IBbqService
{
    private const string DatasetId = "barbecue_pt_t1eam";
    private const string CacheKey = "bbqs";
    private static readonly TimeSpan CacheTtl = TimeSpan.FromHours(6);

    private readonly CaseyOpenDataClient _client;
    private readonly IMemoryCache _cache;

    public BbqService(CaseyOpenDataClient client, IMemoryCache cache)
    {
        _client = client;
        _cache = cache;
    }

    public async Task<CaseyDataResponse<Bbq>> GetBbqsAsync(CancellationToken cancellationToken = default)
    {
        var bbq = await _cache.GetOrCreateAsync(CacheKey, async entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = CacheTtl;

            var records = await _client.GetAllRecordsAsync<BbqRecordDto>(
                DatasetId,
                cancellationToken);

            return records.Select(r => r.ToBbq()).ToList();
        }) ?? new List<Bbq>();

        return new CaseyDataResponse<Bbq>
        {
            TotalCount = bbq.Count,
            Results = bbq
        };
    }
}