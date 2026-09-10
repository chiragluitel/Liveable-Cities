using CaseySmartHub.Api.Models.Common;

namespace CaseySmartHub.Api.Services;

public interface ISearchService
{
    Task<CaseyDataResponse<PlaceSearchResult>> SearchAsync(
        string? query,
        CancellationToken cancellationToken = default);
}
