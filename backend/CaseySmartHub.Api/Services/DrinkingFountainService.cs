using CaseySmartHub.Api.Clients;
using CaseySmartHub.Api.Mapping;
using CaseySmartHub.Api.Models.Common;
using CaseySmartHub.Api.Models.Entities;
using CaseySmartHub.Api.Models.External;
using Microsoft.Extensions.Caching.Memory;

namespace CaseySmartHub.Api.Services;

public sealed class DrinkingFountainService : IDrinkingFountainService
{
    private const string DatasetId = "drinkingfountains_pt_t1eam";
    private const string CacheKey = "drinking-fountains";
    private static readonly TimeSpan CacheTtl = TimeSpan.FromHours(6);

    private readonly CaseyOpenDataClient _client;
    private readonly IMemoryCache _cache;

    public DrinkingFountainService(CaseyOpenDataClient client, IMemoryCache cache)
    {
        _client = client;
        _cache = cache;
    }

    public async Task<CaseyDataResponse<DrinkingFountain>> GetDrinkingFountainsAsync(CancellationToken cancellationToken = default)
    {
        var fountains = await _cache.GetOrCreateAsync(CacheKey, async entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = CacheTtl;
            var records = await _client.GetAllRecordsAsync<DrinkingFountainRecordDto>(DatasetId, cancellationToken);
            return records.Select(record => record.ToDrinkingFountain()).ToList();
        }) ?? new List<DrinkingFountain>();

        return new CaseyDataResponse<DrinkingFountain>
        {
            TotalCount = fountains.Count,
            Results = fountains,
        };
    }
}
