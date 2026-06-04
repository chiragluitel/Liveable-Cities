namespace CaseySmartHub.Api.Models.Entities;

public sealed class Bbq
{
    public int? Id { get; init; }

    public double Latitude { get; init; }
    public double Longitude { get; init; }

    public string? Ward { get; init; }
    public string? Suburb { get; init; }

    public string? ReserveName { get; init; }
    public string? Address { get; init; }

    public string? Type { get; init; }

    public int? Quantity { get; init; }

    public string? Postcode { get; init; }
}
