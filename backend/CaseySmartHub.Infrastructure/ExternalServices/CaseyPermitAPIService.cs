// CaseySmartHub.Infrastructure/ExternalServices/CaseyPermitAPIService.cs
using CaseySmartHub.Application.Interfaces.ExternalServices;
using CaseySmartHub.Domain.Entities;
using CaseySmartHub.Infrastructure.ExternalServices.Base;

namespace CaseySmartHub.Infrastructure.ExternalServices;

public class CaseyPermitAPIService : ICaseyPermitAPIService
{
    private readonly CaseyOpenDataClient _apiClient;
    private const string DatasetId = "register-of-building-permit-applications-in-the-city-of-casey";

    public CaseyPermitAPIService(CaseyOpenDataClient apiClient)
    {
        _apiClient = apiClient;
    }

    public async Task<Permit?> FetchPermitFromExternalAPIAsync(string appNumber, CancellationToken cancellationToken)
    {
        string whereClause = $"application_number='{appNumber}'";
        
        var apiPermit = await _apiClient.FetchSingleRecordAsync<CaseyPermitDto>(
            DatasetId, 
            whereClause, 
            cancellationToken);

        if (apiPermit == null) return null;

        return new Permit
        {
            ApplicationNumber = apiPermit.application_number ?? appNumber,
            PermitNumber = apiPermit.permit_number,
            Category = apiPermit.category ?? "Unknown",
            Status = apiPermit.status ?? "Unknown",
            Suburb = apiPermit.suburb ?? "Unknown",
            Postcode = apiPermit.postcode ?? "Unknown"
        };
    }

    private class CaseyPermitDto
    {
        public string? application_number { get; set; }
        public string? permit_number { get; set; }
        public string? category { get; set; }
        public string? status { get; set; }
        public string? suburb { get; set; }
        public string? postcode { get; set; }
    }
}