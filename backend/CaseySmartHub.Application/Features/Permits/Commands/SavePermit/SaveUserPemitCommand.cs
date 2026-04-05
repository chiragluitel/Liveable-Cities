using MediatR;

namespace CaseySmartHub.Application.Features.Permits.Commands;

public record SaveUserPermitCommand(Guid UserId, string ApplicationNumber) : IRequest<bool>;