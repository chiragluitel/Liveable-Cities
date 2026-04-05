using CaseySmartHub.Application.Interfaces.Repositories;
using CaseySmartHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CaseySmartHub.Infrastructure.Persistence.Repositories;

public class PermitRepository : IPermitRepository
{
    private readonly AppDbContext _context;

    public PermitRepository (AppDbContext context)
    {
        _context = context;
    }

    public async Task<Permit?> GetPermitByAppNumberAsync(string appNumber, CancellationToken cancellationToken)
    {
        return await _context.Permits
            .FirstOrDefaultAsync(p => p.ApplicationNumber == appNumber, cancellationToken);
    }

    public async Task AddPermitAsync(Permit permit, CancellationToken cancellationToken)
    {   
        await _context.Permits
            .AddAsync(permit, cancellationToken);
    }

    public async Task<bool> HasUserSavedPermitAsync(Guid userId, Guid permitId, CancellationToken cancellationToken)
    {
        return await _context.UserPermits
            .AnyAsync(up => up.UserId == userId && up.PermitId == permitId, cancellationToken);
    }

    public async Task AddUserPermitAsync(UserPermit userPermit, CancellationToken cancellationToken)
    {
        await _context.UserPermits.AddAsync(userPermit, cancellationToken);
    }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<IEnumerable<Permit>> GetAllPermitsAsync(CancellationToken cancellationToken)
    {
        return await _context.Permits.ToListAsync(cancellationToken);
    }
}