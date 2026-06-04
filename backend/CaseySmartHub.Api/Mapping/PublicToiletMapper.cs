using CaseySmartHub.Api.Models.Entities;
using CaseySmartHub.Api.Models.External;

namespace CaseySmartHub.Api.Mapping;

public static class PublicToiletMapper
{
    public static PublicToilet ToPublicToilet(this PublicToiletRecordDto record) => new()
    {
        Id = record.Gisfid,

        // if geopoint exists then use Lat/Lon, else if null then use 0
        Latitude = record.GeoPoint?.Lat ?? 0,
        Longitude = record.GeoPoint?.Lon ?? 0,

        Ward = record.Ward,
        Suburb = record.Suburb,

        Name = record.Name,
        Address = record.Address,

        Type = record.Facility,

        Quantity = null,  //only sets if database actually has it
        Postcode = record.Postcode
    };
}