namespace CaseySmartHub.Application.Features.Permits.Queries;
public class PermitDto
{
    public Guid Id { get; set; } // From BaseEntity
    public DateTime CreatedAt { get; set; } // From BaseEntity
    public DateTime? UpdatedAt { get; set; } // From BaseEntity
    
    public string ApplicationNumber { get; set; } = string.Empty;
    public string? PermitNumber { get; set; }
    public string Category { get; set; } = string.Empty;
    public string SubCategory { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Suburb { get; set; } = string.Empty;
    public string Postcode { get; set; } = string.Empty;
    public DateTime? DateEntered { get; set; }
    public DateTime? IssueDate { get; set; }
}