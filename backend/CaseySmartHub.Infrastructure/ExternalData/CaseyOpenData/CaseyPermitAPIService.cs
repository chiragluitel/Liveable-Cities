using CaseySmartHub.Application.DTOs.External.CaseyOpenData;
using CaseySmartHub.Application.ExternalServices.CaseyOpenData;

namespace CaseySmartHub.Infrastructure.ExternalData.CaseyOpenData;

public class CaseyPermitAPIService : ICaseyPermitAPIService
{
    private readonly CaseyOpenDataClientBase _apiClient;
    private const string _datasetId = "register-of-building-permit-applications-in-the-city-of-casey";
    public CaseyPermitAPIService(CaseyOpenDataClientBase apiClient)
    {
        _apiClient = apiClient;
    }

    public async Task<BuildingPermitDto?> GetBuildingPermitByApplicationNumberAsync(string ApplicationNumber, CancellationToken cancellationToken)
    {
        var query = $"appno='{ApplicationNumber}'";

        return await _apiClient.FetchSpecificRecordAsync<BuildingPermitDto>(_datasetId, query, cancellationToken);
    }
}