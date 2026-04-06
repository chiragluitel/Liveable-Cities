namespace CaseySmartHub.Application.Interfaces.Repositories;

/*
CL 06042026
This repository will define all basic CRUD functions possible with our entities
To be inherited by other repositories
Must pass T which is Type.
*/
public interface IBaseAsyncRepository<T> where T: class
{
    Task<T?> GetByIDAsync ( CancellationToken cancellationToken, params object[] searchKey);
    Task<IReadOnlyList<T>> GetAllAsync (CancellationToken cancellationToken);
    Task<T> AddAsync(T entity, CancellationToken cancellationToken);
    Task UpdateAsync (T entity, CancellationToken cancellationToken);
    Task DeleteAsync (T entity, CancellationToken cancellationToken);
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}