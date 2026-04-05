namespace CaseySmartHub.Application.Interfaces.Repositories;

public interface IAsyncRepository<T> where T : class
{
    // 1. READ: Get by unique identifier
    Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    // 2. READ: Get everything
    Task<IReadOnlyList<T>> ListAllAsync(CancellationToken cancellationToken);

    // 3. CREATE: Add a new record
    Task<T> AddAsync(T entity, CancellationToken cancellationToken);

    // 4. UPDATE: Update an existing record
    Task UpdateAsync(T entity, CancellationToken cancellationToken);

    // 5. DELETE: Remove a record
    Task DeleteAsync(T entity, CancellationToken cancellationToken);
    
    // 6. PERSISTENCE: Save changes to DB
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}