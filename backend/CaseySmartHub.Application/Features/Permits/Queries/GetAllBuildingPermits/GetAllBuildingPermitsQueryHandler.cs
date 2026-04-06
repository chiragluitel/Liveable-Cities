using CaseySmartHub.Application.Features.Permits.Queries.GetAllBuildingPermits;
using CaseySmartHub.Application.Interfaces.Repositories;
using CaseySmartHub.Domain.Entities;
using MediatR;

namespace CaseySmartHub.Application.Features.Permits.Queries.GetAllBuildingPermitsQueryHandler;

public class GetAllBuildingPermitsQueryHandler(IBuildingPermitRepository buildingPermitRepository) 
    : IRequestHandler<GetAllBuildingPermitsQuery, IReadOnlyCollection<BuildingPermit>>
{
    public async Task<IReadOnlyCollection<BuildingPermit>> Handle(GetAllBuildingPermitsQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var buildingPermits = await buildingPermitRepository.GetAllAsync(cancellationToken);     
            return buildingPermits;       
        } catch(Exception ex)
        {
            throw new Exception("An unknown error occured: " + ex.Message);
        }
        
    }
}