using CaseySmartHub.Domain.Entities;

namespace CaseySmartHub.Application.Interfaces.ExternalServices;

public interface ICaseyPermitAPIService
{
    Task<Permit?> FetchPermitFromExternalAPIAsync (string appNumber, CancellationToken cancellationToken);
}