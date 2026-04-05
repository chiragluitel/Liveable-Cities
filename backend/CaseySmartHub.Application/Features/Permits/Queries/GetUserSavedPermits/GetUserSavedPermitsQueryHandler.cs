using CaseySmartHub.Application.Interfaces.Repositories;
using MediatR;

namespace CaseySmartHub.Application.Features.Permits.Queries.GetUserSavedPermits;
public class GetUserSavedPermitsQueryHandler (IPermitRepository permitRepository ) : IRequestHandler<GetUserSavedPermitsQuery, IEnumerable<UserSavedPermitDto>>
{
public async Task<IEnumerable<UserSavedPermitDto>> Handle(GetUserSavedPermitsQuery request, CancellationToken cancellationToken)
    {
        // 1. Fetch from DB with the .Include(up => up.Permit)
        var userPermits = await permitRepository.GetUserSavedPermitsAsync(request.UserId, cancellationToken);

        // 2. Map EVERYTHING to the frontend contract
        var toReturnUserPermit = userPermits.Select(up => new UserSavedPermitDto
        {
            SavedAt = up.SavedAt,
            CustomUserNote = up.CustomUserNote,
            Permit = new PermitDto
            {
                Id = up.Permit.Id,
                CreatedAt = up.Permit.CreatedAt,
                UpdatedAt = up.Permit.UpdatedAt,
                ApplicationNumber = up.Permit.ApplicationNumber,
                PermitNumber = up.Permit.PermitNumber,
                Category = up.Permit.Category,
                SubCategory = up.Permit.SubCategory,
                Status = up.Permit.Status,
                Suburb = up.Permit.Suburb,
                Postcode = up.Permit.Postcode,
                DateEntered = up.Permit.DateEntered,
                IssueDate = up.Permit.IssueDate
            }
        });

        return toReturnUserPermit;
    }
}