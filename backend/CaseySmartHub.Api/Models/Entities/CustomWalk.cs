namespace CaseySmartHub.Api.Models.Entities;

public sealed class CustomWalk
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Distance { get; set; }
    public bool HasWaterFountain { get; set; }
    public bool HasDisabledToilets { get; set; }
    public bool HasPark { get; set; }
    public bool HasPlayground { get; set; }
    public bool HasWellLitStreets { get; set; }
    public bool HasRubbishBin { get; set; }
    public bool HasOffLeash { get; set; }
}
