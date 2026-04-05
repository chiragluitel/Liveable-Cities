using CaseySmartHub.Domain.Entities;
using MediatR;

namespace CaseySmartHub.Application.Features.Permits.Queries.GetAllPermits;
public record  GetAllPermitsQuery () : IRequest<IEnumerable<PermitDto>>;