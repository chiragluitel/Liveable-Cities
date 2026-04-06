using CaseySmartHub.Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace CaseySmartHub.Infrastructure.Persistence.Repositories;

public class BaseAsyncRepository<T> : IBaseAsyncRepository<T> where T: class
{
    protected readonly AppDbContext _context;

    public BaseAsyncRepository(AppDbContext context)
    {
        _context = context;
    }
    //params object[] key allows for inputs of multiple key -> e.g. for junction table, pass (cancellationToken, key1, key2)
    //params object[] key allows for inputs of multiple key -> for normal table, pass (cancellationToken, primaryKey)
    public virtual async Task<T?> GetByIDAsync (CancellationToken cancellationToken, params object[] searchKey)
    {

        return await _context.Set<T>()
            .FindAsync(searchKey, cancellationToken);
    }
    public virtual async Task<IReadOnlyList<T>> GetAllAsync (CancellationToken cancellationToken)
    {
        return await _context.Set<T>()
            .ToListAsync(cancellationToken);
    }
    public virtual async Task<T> AddAsync(T entity, CancellationToken cancellationToken)
    {
        await _context.Set<T>()
            .AddAsync(entity, cancellationToken);
        return entity;
    }
        public virtual Task UpdateAsync(T entity, CancellationToken cancellationToken)
    {
        _context.Entry(entity).State = EntityState.Modified;
        return Task.CompletedTask;
    }

    public virtual Task DeleteAsync(T entity, CancellationToken cancellationToken)
    {
        _context.Set<T>().Remove(entity);
        return Task.CompletedTask;
    }
        public virtual async Task<int> SaveChangesAsync(CancellationToken cancellationToken)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }
}