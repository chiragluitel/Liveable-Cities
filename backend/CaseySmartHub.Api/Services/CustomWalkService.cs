using CaseySmartHub.Api.Data;
using CaseySmartHub.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace CaseySmartHub.Api.Services;

public sealed class CustomWalkService : ICustomWalkService
{
    private readonly CaseyDbContext _db;

    public CustomWalkService(CaseyDbContext db)
    {
        _db = db;
    }

    public async Task<IReadOnlyList<CustomWalk>> GetByUserIdAsync(string userId, CancellationToken cancellationToken = default)
    {
        return await _db.CustomWalks
            .Where(w => w.UserId == userId)
            .ToListAsync(cancellationToken);
    }

    public async Task<CustomWalk> CreateAsync(CustomWalk walk, CancellationToken cancellationToken = default)
    {
        _db.CustomWalks.Add(walk);
        await _db.SaveChangesAsync(cancellationToken);
        return walk;
    }

    public async Task<CustomWalk?> UpdateAsync(int id, CustomWalk walk, CancellationToken cancellationToken = default)
    {
        var existing = await _db.CustomWalks.FindAsync([id], cancellationToken);
        if (existing is null) return null;

        existing.Name = walk.Name;
        existing.Distance = walk.Distance;
        existing.HasWaterFountain = walk.HasWaterFountain;
        existing.HasDisabledToilets = walk.HasDisabledToilets;
        existing.HasPark = walk.HasPark;
        existing.HasPlayground = walk.HasPlayground;
        existing.HasWellLitStreets = walk.HasWellLitStreets;
        existing.HasRubbishBin = walk.HasRubbishBin;
        existing.HasOffLeash = walk.HasOffLeash;

        await _db.SaveChangesAsync(cancellationToken);
        return existing;
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var existing = await _db.CustomWalks.FindAsync([id], cancellationToken);
        if (existing is null) return false;

        _db.CustomWalks.Remove(existing);
        await _db.SaveChangesAsync(cancellationToken);
        return true;
    }
}
