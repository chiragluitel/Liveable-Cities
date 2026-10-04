using CaseySmartHub.Api.Models.Common;
using CaseySmartHub.Api.Models.Entities;

namespace CaseySmartHub.Api.Services;

public sealed class SearchService : ISearchService
{
    private const string LibraryType = "library";
    private const string DefaultState = "Victoria";
    private const string DefaultCountry = "Australia";

    private readonly ILibraryService _libraryService;

    public SearchService(ILibraryService libraryService)
    {
        _libraryService = libraryService;
    }

    public async Task<CaseyDataResponse<PlaceSearchResult>> SearchAsync(
        string? query,
        CancellationToken cancellationToken = default)
    {
        var term = query?.Trim();

        if (string.IsNullOrEmpty(term))
        {
            return new CaseyDataResponse<PlaceSearchResult>();
        }

        // Reuses LibraryService's 6h memory cache rather than re-fetching.
        var libraries = await _libraryService.GetLibrariesAsync(cancellationToken);

        var matches = libraries.Results
            .Select(ToSearchResult)
            .Where(r => Matches(r, term))
            .ToList();

        return new CaseyDataResponse<PlaceSearchResult>
        {
            TotalCount = matches.Count,
            Results = matches
        };
    }

    private static bool Matches(PlaceSearchResult result, string term) =>
        result.Title.Contains(term, StringComparison.OrdinalIgnoreCase)
        || result.StreetAddress.Contains(term, StringComparison.OrdinalIgnoreCase)
        || result.Suburb.Contains(term, StringComparison.OrdinalIgnoreCase);

    private static PlaceSearchResult ToSearchResult(Library library, int index) => new()
    {
        Id = $"{LibraryType}-{index}",
        Title = library.Name ?? string.Empty,
        StreetAddress = library.Address ?? string.Empty,
        Suburb = library.Postcode ?? string.Empty,
        State = DefaultState,
        Country = DefaultCountry,
        Latitude = library.Latitude,
        Longitude = library.Longitude,
        Type = LibraryType
    };
}
