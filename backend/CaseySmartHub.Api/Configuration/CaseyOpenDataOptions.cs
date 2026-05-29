namespace CaseySmartHub.Api.Configuration;

public sealed class CaseyOpenDataOptions
{
    public const string SectionName = "CaseyOpenData";
    public string BaseUrl { get; init; } = default!;
    public string? ApiKey { get; init; }
}
