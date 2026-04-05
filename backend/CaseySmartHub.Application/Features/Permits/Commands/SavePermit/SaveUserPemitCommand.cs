using MediatR;

namespace CaseySmartHub.Application.Features.Permits.Commands.SavePermit;

public record SaveUserPermitCommand(Guid UserId, string ApplicationNumber) : IRequest<bool>;