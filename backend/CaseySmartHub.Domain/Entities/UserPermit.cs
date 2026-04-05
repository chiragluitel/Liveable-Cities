//Gets All permits for a user, or all users for a permit.

namespace CaseySmartHub.Domain.Entities;

public class UserPermit
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;

    public Guid PermitId { get; set; }
    //the below won't be created by DB 
    public Permit Permit { get; set; } = null!;

    //Custom Data capability for that specific User, for that specific permit
    public DateTime SavedAt { get; set; } = DateTime.UtcNow;
    public string? CustomUserNote { get; set; }
}