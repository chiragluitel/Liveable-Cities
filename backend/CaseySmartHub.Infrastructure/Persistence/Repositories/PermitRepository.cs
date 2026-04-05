using CaseySmartHub.Application.Interfaces.Repositories;
using CaseySmartHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CaseySmartHub.Infrastructure.Persistence.Repositories;

public class PermitRepository : AsyncRepository<Permit>, IPermitRepository
{
    public PermitRepository(AppDbContext context) : base(context)
    {
        // _context is inherited from the base AsyncRepository
    }
    //All CRUD come from AsyncRepo, implement only specialised functions here
    public async Task<Permit?> GetPermitByAppNumberAsync(string appNumber, CancellationToken cancellationToken)
    {
        return await _context.Permits
            .FirstOrDefaultAsync(p => p.ApplicationNumber == appNumber, cancellationToken);
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
}