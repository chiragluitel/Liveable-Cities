namespace CaseySmartHub.Api.Models.Entities;

public sealed class DrinkingFountain
{
    public int? Id { get; init; }
    public double Latitude { get; init; }
    public double Longitude { get; init; }
    public string? Ward { get; init; }
    public string? Suburb { get; init; }
    public string? ParkReserveName { get; init; }
    public string? Address { get; init; }
    public string? FeatureType { get; init; }
    public string? FountainType { get; init; } 
    public string? Material { get; init; }
    public string? Condition { get; init; }
    public string? Postcode { get; init; }
}
