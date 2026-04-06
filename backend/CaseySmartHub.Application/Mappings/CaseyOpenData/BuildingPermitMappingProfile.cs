using System.Globalization;
using AutoMapper;
using CaseySmartHub.Application.DTOs.External.CaseyOpenData;
using CaseySmartHub.Domain.Entities;

namespace CaseySmartHub.Application.Mappings.CaseyOpenData;

public class BuildingPermitMappingProfile : Profile
{
    public BuildingPermitMappingProfile()
    {
        CreateMap<BuildingPermitDto, BuildingPermit>()
        //Ignore Base Entity Fields
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedAtUTC, opt => opt.Ignore())
            .ForMember(dest => dest.UpdatedAtUTC, opt => opt.Ignore())
        //Map for Stage Enum
            .ForMember (dest => dest.Status, opt => opt.MapFrom(src => MapStatus(src.Status)))
        //Custom Maps for Date
            .ForMember(dest => dest.IssuedDate, opt => opt.MapFrom(src => ParseDate(src.IssueDate)))
            .ForMember(dest => dest.OccupancyPermitDate, opt => opt.MapFrom(src => ParseDate(src.OccupancyPermitDate)))
            .ForMember(dest => dest.FinalCertificateIssued, opt => opt.MapFrom(src => ParseDate(src.FinalCertificateIssued)))
            .ForMember(dest => dest.DateEntered, opt => opt.MapFrom(src => ParseDate(src.DateEntered) ?? DateTime.UtcNow))
        //Custom Map for turning "Not Applicable" to null
            .ForMember(dest => dest.BuildingRegulationNumbers, opt => opt.MapFrom(src => src.BuildingRegulationNumbers == "Not Applicable" ? null : src.BuildingRegulationNumbers));
    }
    // Helper method to parse the Enum strings
    private static Status MapStatus(string rawStatus)
    {
        return rawStatus?.Trim() switch
        {
            "Approved/Finalised" => Status.Approved_Finalised,
            "Lapsed/Expired"     => Status.Lapsed_Expired,
            "Cancelled/Withdrawn" => Status.Cancelled_Withdrawn,
            "In-Progress"        => Status.In_Progress, 
            _                    => Status.In_Progress //default
        };
    }

    private static DateTime? ParseDate(string dateStr)
    {
        if (string.IsNullOrWhiteSpace(dateStr)) return null;

        // Assuming Casey data comes in format yyyy-MM-dd
        if (DateTime.TryParseExact(dateStr, "yyyy-MM-dd", CultureInfo.InvariantCulture, 
                System.Globalization.DateTimeStyles.AssumeUniversal | System.Globalization.DateTimeStyles.AdjustToUniversal, 
                out var parsedDate))
        {
            return parsedDate;
        }
        if (DateTime.TryParse(dateStr, CultureInfo.InvariantCulture, 
        System.Globalization.DateTimeStyles.AssumeUniversal | System.Globalization.DateTimeStyles.AdjustToUniversal, 
            out var fallbackDate))
        {
            return fallbackDate;
        }
        
        return null;
    }
}