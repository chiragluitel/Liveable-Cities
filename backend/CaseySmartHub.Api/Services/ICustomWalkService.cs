using CaseySmartHub.Api.Models.Entities;

namespace CaseySmartHub.Api.Services;

public interface ICustomWalkService
{
    Task<IReadOnlyList<CustomWalk>> GetByUserIdAsync(string userId, CancellationToken cancellationToken = default);
    Task<CustomWalk> CreateAsync(CustomWalk walk, CancellationToken cancellationToken = default);
    Task<CustomWalk?> UpdateAsync(int id, CustomWalk walk, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
