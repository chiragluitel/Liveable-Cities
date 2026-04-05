using System.Diagnostics.Contracts;
using CaseySmartHub.Domain.Common;

namespace CaseySmartHub.Domain.Entities;

public class Permit : BaseEntity
{
    public string ApplicationNumber { get; set; } = string.Empty;
    public string? PermitNumber { get; set; }
    public string Category { get; set; } = string.Empty;
    public string SubCategory { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Suburb { get; set; } = string.Empty;
    public string Postcode { get; set; } = string.Empty;

    public DateTime? DateEntered { get; set; }
    public DateTime? IssueDate { get; set; }

    //For future proofing, incase we need all users who have a specific permit
    public ICollection<UserPermit> UserPermits {get; set;} = new List<UserPermit>();

}