using CaseySmartHub.Api.Models.Entities;
using CaseySmartHub.Api.Models.External;

namespace CaseySmartHub.Api.Mapping;

public static class LibraryMapper
{
    public static Library ToLibrary(this LibraryRecordDto record) => new()
    {
        Id = null,

        Latitude = record.GeoPoint?.Lat ?? 0,
        Longitude = record.GeoPoint?.Lon ?? 0,

        Name = record.Name,
        Address = record.Address,
        Postcode = record.Postcode,

        Description = record.Description,

        Phone = record.Phone,
        Website = record.Website,
        Email = record.Email,

        OpeningHours = record.OpeningHours,

        Type = record.Category
    };
}