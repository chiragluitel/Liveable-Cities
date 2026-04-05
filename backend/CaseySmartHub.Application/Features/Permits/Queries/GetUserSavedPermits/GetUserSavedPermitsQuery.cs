using CaseySmartHub.Domain.Entities;
using MediatR;

namespace CaseySmartHub.Application.Features.Permits.Queries.GetUserSavedPermits;

public record GetUserSavedPermitsQuery (Guid UserId) : IRequest<IEnumerable<UserSavedPermitDto>>;