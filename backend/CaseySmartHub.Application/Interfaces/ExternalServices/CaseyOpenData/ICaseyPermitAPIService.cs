using CaseySmartHub.Application.DTOs.External.CaseyOpenData;

namespace CaseySmartHub.Application.ExternalServices.CaseyOpenData;

public interface ICaseyPermitAPIService
{
    Task<BuildingPermitDto?> GetBuildingPermitByApplicationNumberAsync(string ApplicationNumber, CancellationToken cancellationToken);
}