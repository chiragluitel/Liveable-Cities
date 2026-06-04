using CaseySmartHub.Api.Models.Common;
using CaseySmartHub.Api.Models.Entities;

namespace CaseySmartHub.Api.Services;

public interface IPublicToiletService
{
    Task<CaseyDataResponse<PublicToilet>> GetPublicToiletsAsync(CancellationToken cancellationToken = default);
}