using CaseySmartHub.Domain.Entities;

namespace CaseySmartHub.Application.Interfaces.Repositories;

public interface IPermitRepository : IAsyncRepository<Permit>
{

    //Simple CRUD are from IAsyncRepo, just add custom functions here
    Task<Permit?> GetPermitByAppNumberAsync(string appNumber, CancellationToken cancellationToken);
    Task<bool> HasUserSavedPermitAsync(Guid userId, Guid permitId, CancellationToken cancellationToken);
    Task AddUserPermitAsync(UserPermit userPermit, CancellationToken cancellationToken);

}