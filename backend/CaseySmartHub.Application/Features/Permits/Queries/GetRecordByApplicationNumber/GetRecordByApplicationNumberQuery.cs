using CaseySmartHub.Domain.Entities;
using MediatR;

namespace CaseySmartHub.Application.Features.Permits.Queries.GetRecordByApplicationNumber;

public record GetRecordByApplicationNumberQuery (string ApplicationNumber) : IRequest<BuildingPermit?> {}