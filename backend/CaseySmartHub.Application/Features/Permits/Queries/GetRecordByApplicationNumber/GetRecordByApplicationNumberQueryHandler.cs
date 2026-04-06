using AutoMapper;
using CaseySmartHub.Application.ExternalServices.CaseyOpenData;
using CaseySmartHub.Application.Interfaces.Repositories;
using CaseySmartHub.Domain.Entities;
using CaseySmartHub.Domain.Exceptions;
using MediatR;

namespace CaseySmartHub.Application.Features.Permits.Queries.GetRecordByApplicationNumber;

public class GetRecordByApplicationNumber (IBuildingPermitRepository buildingPermitRepository, ICaseyPermitAPIService caseyPermitAPIService, IMapper mapper ) 
    : IRequestHandler<GetRecordByApplicationNumberQuery, BuildingPermit?>
{
    public async Task<BuildingPermit?> Handle(GetRecordByApplicationNumberQuery request, CancellationToken cancellationToken)
    {
        //1. Check local DB
        var buildingPermit = await buildingPermitRepository.GetBuildingPermitByApplicationNumberAsync(request.ApplicationNumber, cancellationToken);

        if (buildingPermit != null)
        {
            return buildingPermit;
            //buildingPermit = await caseyPermitAPIService.GetBuildingPermitByApplicationNumberAsync(request.ApplicationNumber, cancellationToken);
        }
        var buildingPermitDto = await caseyPermitAPIService.GetBuildingPermitByApplicationNumberAsync(request.ApplicationNumber, cancellationToken);

        if (buildingPermitDto == null)
        {
            throw new ApplicationNotFoundException(request.ApplicationNumber);
        }

        buildingPermit = mapper.Map<BuildingPermit>(buildingPermitDto);

        await buildingPermitRepository.AddAsync(buildingPermit, cancellationToken);
        await buildingPermitRepository.SaveChangesAsync(cancellationToken);
        
        return buildingPermit;

    }
}