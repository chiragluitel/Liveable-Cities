/*
CL 06042026
Any specific methods to be written here
CRUD to be inherited.
*/
using CaseySmartHub.Domain.Entities;

namespace CaseySmartHub.Application.Interfaces.Repositories;

public interface IBuildingPermitRepository : IBaseAsyncRepository <BuildingPermit>
{
    Task<BuildingPermit?> GetBuildingPermitByApplicationNumberAsync(string ApplicationNumber, CancellationToken cancellationToken);
}