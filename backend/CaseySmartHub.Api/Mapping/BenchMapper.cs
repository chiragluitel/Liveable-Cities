using CaseySmartHub.Api.Models.Entities;
using CaseySmartHub.Api.Models.External;

namespace CaseySmartHub.Api.Mapping;

public static class BenchMapper
{
    public static Bench ToBench(this BenchRecordDto record) => new()
    {
        Id = record.GisFid,
        Latitude = record.GeoPoint?.Lat ?? 0,
        Longitude = record.GeoPoint?.Lon ?? 0,
        Ward = record.Ward,
        Suburb = record.Suburb,
        ReserveName = record.ReserveName,
        Address = record.Address,
        Type = record.Facility,
        Material = record.Material,
        Quantity = record.Quantity,
        Postcode = record.Postcode,
    };
}
