using CaseySmartHub.Api.Models.Common;
using CaseySmartHub.Api.Models.Entities;

namespace CaseySmartHub.Api.Services;

public interface IDrinkingFountainService
{
    Task<CaseyDataResponse<DrinkingFountain>> GetDrinkingFountainsAsync(CancellationToken cancellationToken = default);
}
