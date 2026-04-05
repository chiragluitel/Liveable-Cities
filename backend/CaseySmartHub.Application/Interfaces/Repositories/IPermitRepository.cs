using CaseySmartHub.Domain.Entities;

namespace CaseySmartHub.Application.Interfaces.Repositories;

public interface IPermitRepository
{

    //this contains functions/tasks on the stuff we can do with the data WE OWN. So, all this will be functions for local DB.
    Task<Permit?> GetPermitByAppNumberAsync(string appNumber, CancellationToken cancellationToken);
    
    Task AddPermitAsync(Permit permit, CancellationToken cancellationToken);
    
    Task<bool> HasUserSavedPermitAsync(Guid userId, Guid permitId, CancellationToken cancellationToken);
    
    Task AddUserPermitAsync(UserPermit userPermit, CancellationToken cancellationToken);
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}