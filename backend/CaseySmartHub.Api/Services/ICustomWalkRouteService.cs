using CaseySmartHub.Api.Models.Routing;

namespace CaseySmartHub.Api.Services;

public interface ICustomWalkRouteService
{
    Task<CustomWalkRouteResponse> GetCustomWalkRouteAsync(
        CustomWalkRouteRequest request,
        CancellationToken cancellationToken = default);
}