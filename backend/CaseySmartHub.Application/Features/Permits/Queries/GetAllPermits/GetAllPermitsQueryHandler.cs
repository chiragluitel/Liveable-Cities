using CaseySmartHub.Application.Features.Permits.Queries.GetAllPermits;
using CaseySmartHub.Application.Interfaces.ExternalServices;
using CaseySmartHub.Application.Interfaces.Repositories;
using CaseySmartHub.Domain.Entities;
using MediatR;

namespace CaseySmartHub.Application.Features.Permits.Queries;

public class GetAllPermitsQueryHandler (IPermitRepository permitRepository):
    IRequestHandler<GetAllPermitsQuery, IEnumerable<PermitDto>> 
{
    public async Task<IEnumerable<PermitDto>> Handle (GetAllPermitsQuery request, CancellationToken cancellationToken)
    {
        var permits =  await permitRepository.ListAllAsync(cancellationToken);

        var toReturnPermit = permits.Select(up => new PermitDto
        {
            Id = up.Id,
                CreatedAt = up.CreatedAt,
                UpdatedAt = up.UpdatedAt,
                ApplicationNumber = up.ApplicationNumber,
                PermitNumber = up.PermitNumber,
                Category = up.Category,
                SubCategory = up.SubCategory,
                Status = up.Status,
                Suburb = up.Suburb,
                Postcode = up.Postcode,
                DateEntered = up.DateEntered,
                IssueDate = up.IssueDate
        });

        return toReturnPermit;
    }
}