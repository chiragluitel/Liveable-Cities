namespace CaseySmartHub.Domain.Common;

public abstract class BaseEntity 
{
    public Guid Id{get;set;} = Guid.NewGuid();
    public DateTime CreatedAtUTC {get;set;} = DateTime.UtcNow;
    public DateTime UpdatedAtUTC {get;set;} = DateTime.UtcNow;
}