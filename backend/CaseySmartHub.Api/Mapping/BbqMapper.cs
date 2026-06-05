using CaseySmartHub.Api.Models.Entities;
using CaseySmartHub.Api.Models.External;

namespace CaseySmartHub.Api.Mapping;

public static class BbqMapper
{
    public static Bbq ToBbq(this BbqRecordDto record) => new()
    {
        Id = record.Gisfid,

        Latitude = record.GeoPoint?.Lat ?? 0,
        Longitude = record.GeoPoint?.Lon ?? 0,

        Ward = record.Ward,
        Suburb = record.Suburb,

        ReserveName = record.ReserveName,
        Address = record.Address,

        Type = record.Facility,

        Quantity = record.Quantity,
        Postcode = record.Postcode
    };
}