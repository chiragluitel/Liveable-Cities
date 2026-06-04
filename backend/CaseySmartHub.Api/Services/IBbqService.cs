using CaseySmartHub.Api.Models.Common;
using CaseySmartHub.Api.Models.Entities;

namespace CaseySmartHub.Api.Services;

public interface IBbqService
{
    Task<CaseyDataResponse<Bbq>> GetBbqsAsync(CancellationToken cancellationToken = default);
}
