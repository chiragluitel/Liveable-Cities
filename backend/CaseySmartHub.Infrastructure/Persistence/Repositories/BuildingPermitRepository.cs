using CaseySmartHub.Application.Interfaces.Repositories;
using CaseySmartHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CaseySmartHub.Infrastructure.Persistence.Repositories;

public class BuildingPermitRepository : BaseAsyncRepository<BuildingPermit>, IBuildingPermitRepository
{
    public BuildingPermitRepository(AppDbContext context):base(context){}

    public async Task<BuildingPermit?> GetBuildingPermitByApplicationNumberAsync(string ApplicationNumber, CancellationToken cancellationToken)
    {
        return await _context.BuildingPermits
            .FirstOrDefaultAsync(p => p.ApplicationNumber == ApplicationNumber, cancellationToken);
    }
}