using CaseySmartHub.Application.Interfaces.ExternalServices;
using CaseySmartHub.Application.Interfaces.Repositories;
using CaseySmartHub.Domain.Entities;
using MediatR;

namespace CaseySmartHub.Application.Features.Permits.Queries;

public class GetAllPermitsQueryHandler (IPermitRepository permitRepository):
    IRequestHandler<GetAllPermitsQuery, IEnumerable<Permit>> 
{
    public async Task<IEnumerable<Permit>> Handle (GetAllPermitsQuery request, CancellationToken cancellationToken)
    {
        return await permitRepository.GetAllPermitsAsync(cancellationToken);
    }
}