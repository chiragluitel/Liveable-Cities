using CaseySmartHub.Domain.Entities;
using MediatR;

namespace CaseySmartHub.Application.Features.Permits.Queries.GetAllBuildingPermits;

public record GetAllBuildingPermitsQuery () : IRequest <IReadOnlyCollection<BuildingPermit>> {}