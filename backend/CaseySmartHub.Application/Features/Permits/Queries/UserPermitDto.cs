namespace CaseySmartHub.Application.Features.Permits.Queries;

public class UserSavedPermitDto
{
    public DateTime SavedAt { get; set; }
    public string? CustomUserNote { get; set; }
    
    // The entire Permit object, exactly as the frontend requested
    public PermitDto Permit { get; set; } = null!; 
}