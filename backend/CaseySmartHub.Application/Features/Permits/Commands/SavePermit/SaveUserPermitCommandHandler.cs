using CaseySmartHub.Application.Features.Permits.Commands.SavePermit;
using CaseySmartHub.Application.Interfaces.ExternalServices;
using CaseySmartHub.Application.Interfaces.Repositories;
using CaseySmartHub.Domain.Entities;
using CaseySmartHub.Domain.Exceptions;
using MediatR;

namespace CaseySmartHub.Application.Features.Permits.Commands;

public class SaveUserPermitCommandHandler : IRequestHandler<SaveUserPermitCommand, bool>
{
    private readonly IPermitRepository _permitRepository;
    private readonly ICaseyPermitAPIService _externalAPIService;

    public SaveUserPermitCommandHandler(IPermitRepository permitRepository, ICaseyPermitAPIService caseyPermitAPIService)
    {
        _permitRepository = permitRepository;
        _externalAPIService = caseyPermitAPIService;
    }

    public async Task<bool> Handle(SaveUserPermitCommand request, CancellationToken cancellationToken){
        //check local DB
        var permit = await _permitRepository.GetPermitByAppNumberAsync (request.ApplicationNumber, cancellationToken);
        if (permit == null)
        {
            permit = await _externalAPIService.FetchPermitFromExternalAPIAsync(request.ApplicationNumber, cancellationToken);
            if (permit == null)
            {
                throw new PermitNotFoundException(request.ApplicationNumber);
            }

            await _permitRepository.AddAsync(permit, cancellationToken);
            await _permitRepository.SaveChangesAsync(cancellationToken);
        }

        var isAlreadySaved = await _permitRepository.HasUserSavedPermitAsync(request.UserId, permit.Id, cancellationToken);
        if (isAlreadySaved)
        {
            return true;//its already saved, no further processing
        }

        var userPermitLink = new UserPermit
        {
            UserId = request.UserId,
            PermitId = permit.Id,
            CustomUserNote = "",
            SavedAt = DateTime.UtcNow,
        };

        await _permitRepository.AddUserPermitAsync(userPermitLink, cancellationToken);
        var result = await _permitRepository.SaveChangesAsync(cancellationToken);

        return result > 0;

    }
}