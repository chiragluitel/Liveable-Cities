namespace CaseySmartHub.Api.Models.Common;

public sealed class CaseyDataResponse<T>
{
    public int TotalCount { get; init; }
    public IReadOnlyList<T> Results { get; init; } = [];
}
