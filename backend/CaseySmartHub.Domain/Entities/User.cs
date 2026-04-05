using CaseySmartHub.Domain.Common;

namespace CaseySmartHub.Domain.Entities;

public class User : BaseEntity
{
    public string AuthId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Suburb { get; set; } = string.Empty;
    //NEED TO ADD STUFF LATER HERE FOR USER

    //SAVES FOR USERS LATERS -> Like Saved Walks, Saved Filters, etc.
    public ICollection<UserPermit> UserPermits {get; set;} = new List<UserPermit>();
}