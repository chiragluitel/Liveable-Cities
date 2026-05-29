using CaseySmartHub.Api.Models.Common;
using CaseySmartHub.Api.Models.Entities;

namespace CaseySmartHub.Api.Services;

public interface IBenchService
{
    Task<CaseyDataResponse<Bench>> GetBenchesAsync(CancellationToken cancellationToken = default);
}
