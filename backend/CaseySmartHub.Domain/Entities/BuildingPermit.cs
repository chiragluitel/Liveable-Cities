/*
Entity for Register of Building Permit Applications City of Casey
To Do: Implement a Base Permit Class for Building Permit and Planning Permit
*/

using CaseySmartHub.Domain.Common;

namespace CaseySmartHub.Domain.Entities;

public class BuildingPermit : BaseEntity
{
    public string ApplicationNumber {get;set;} = null!;
    public string PermitNumber {get;set;} = string.Empty;
    public string ApplicationCategory {get;set;} = string.Empty;
    public string StageDecision {get;set;} = string.Empty;
    public string? IssuedYear {get;set;} 
    public DateTime? IssuedDate {get;set;}
    public DateTime? OccupancyPermitDate {get;set;}
    public DateTime? FinalCertificateIssued {get;set;}
    public string SubCategory {get;set;} = string.Empty;
    public string Suburb {get;set;} = string.Empty;
    public string Postcode{get;set;} = string.Empty;
    public string CouncilWard {get;set;} = string.Empty;
    public Status Status {get;set;}
    public DateTime DateEntered {get;set;}
    public string? BuildingRegulationNumbers {get;set;}
}

public enum Status
{
    Approved_Finalised,
    Lapsed_Expired,
    Cancelled_Withdrawn,
    In_Progress
}