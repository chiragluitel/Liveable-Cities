using CaseySmartHub.Api.Clients;
using CaseySmartHub.Api.Mapping;
using CaseySmartHub.Api.Models.Common;
using CaseySmartHub.Api.Models.Entities;
using CaseySmartHub.Api.Models.External;
using Microsoft.Extensions.Caching.Memory;

namespace CaseySmartHub.Api.Services;

public sealed class BenchService : IBenchService
{
    private const string DatasetId = "benches_seats_pt_t1eam";
    private const string CacheKey = "benches";
    private static readonly TimeSpan CacheTtl = TimeSpan.FromHours(6);

    private readonly CaseyOpenDataClient _client;
    private readonly IMemoryCache _cache;

    public BenchService(CaseyOpenDataClient client, IMemoryCache cache)
    {
        _client = client;
        _cache = cache;
    }

    public async Task<CaseyDataResponse<Bench>> GetBenchesAsync(CancellationToken cancellationToken = default)
    {
        var benches = await _cache.GetOrCreateAsync(CacheKey, async entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = CacheTtl;
            var records = await _client.GetAllRecordsAsync<BenchRecordDto>(DatasetId, cancellationToken);
            return records.Select(record => record.ToBench()).ToList();
        }) ?? new List<Bench>();

        return new CaseyDataResponse<Bench>
        {
            TotalCount = benches.Count,
            Results = benches,
        };
    }
}
