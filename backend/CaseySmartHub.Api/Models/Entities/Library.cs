namespace CaseySmartHub.Api.Models.Entities;

public sealed class Library
{
    public int? Id { get; init; }

    public double Latitude { get; init; }
    public double Longitude { get; init; }

    public string? Name { get; init; }
    public string? Address { get; init; }

    public string? Postcode { get; init; }

    public string? Description { get; init; }

    public string? Phone { get; init; }
    public string? Website { get; init; }
    public string? Email { get; init; }

    public string? OpeningHours { get; init; }

    public string? Type { get; init; }
}