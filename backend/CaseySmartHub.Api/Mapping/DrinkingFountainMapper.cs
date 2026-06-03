using CaseySmartHub.Api.Models.Entities;
using CaseySmartHub.Api.Models.External;

namespace CaseySmartHub.Api.Mapping;

public static class DrinkingFountainMapper
{
    public static DrinkingFountain ToDrinkingFountain(this DrinkingFountainRecordDto record) => new()
    {
        Id = record.GisFid,
        Latitude = record.GeoPoint?.Lat ?? 0,
        Longitude = record.GeoPoint?.Lon ?? 0,
        Ward = record.Ward,
        Suburb = record.Suburb,
        ParkReserveName = record.ParkReserveName,
        Address = record.Address,
        FeatureType = record.FeatureType,
        FountainType = record.FountainType,
        Material = record.Material,
        Condition = record.Condition,
        Postcode = record.Postcode,
    };
}
