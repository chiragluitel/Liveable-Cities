using CaseySmartHub.Domain.Entities;
using MediatR;

namespace CaseySmartHub.Application.Features.Permits.Queries;
public record  GetAllPermitsQuery () : IRequest<IEnumerable<Permit>>;