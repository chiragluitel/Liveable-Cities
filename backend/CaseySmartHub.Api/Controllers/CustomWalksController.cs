using System.Collections.Concurrent;
using CaseySmartHub.Api.Data;
using CaseySmartHub.Api.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CaseySmartHub.Api.Controllers;

[ApiController]
[Route("api/custom-walks")]
public sealed class CustomWalksController : ControllerBase
{
    private static readonly ConcurrentDictionary<string, CustomWalk> InMemoryWalks = new();
    private readonly CaseyDbContext _dbContext;
    private readonly ILogger<CustomWalksController> _logger;

    public CustomWalksController(CaseyDbContext dbContext, ILogger<CustomWalksController> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    private bool IsDatabaseAvailable()
    {
        try
        {
            var connStr = _dbContext.Database.GetDbConnection().ConnectionString;
            return DatabaseAvailability.CanConnect(connStr);
        }
        catch
        {
            return false;
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CustomWalk>>> GetCustomWalks(CancellationToken cancellationToken)
    {
        if (IsDatabaseAvailable())
        {
            try
            {
                var walks = await _dbContext.CustomWalks
                    .AsNoTracking()
                    .OrderByDescending(w => w.CreatedAt)
                    .ToListAsync(cancellationToken);

                return Ok(walks);
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Database query failed ({Message}). Serving custom walks from in-memory fallback.", ex.Message);
            }
        }

        return Ok(InMemoryWalks.Values.OrderByDescending(w => w.CreatedAt).ToList());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CustomWalk>> GetCustomWalkById(string id, CancellationToken cancellationToken)
    {
        if (IsDatabaseAvailable())
        {
            try
            {
                var walk = await _dbContext.CustomWalks
                    .AsNoTracking()
                    .FirstOrDefaultAsync(w => w.Id == id, cancellationToken);

                if (walk is not null)
                {
                    return Ok(walk);
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Database lookup failed ({Message}). Falling back to in-memory store.", ex.Message);
            }
        }

        if (InMemoryWalks.TryGetValue(id, out var inMem))
        {
            return Ok(inMem);
        }

        return NotFound(new { message = $"Custom walk with ID {id} was not found." });
    }

    [HttpPost]
    public async Task<ActionResult<CustomWalk>> SaveCustomWalk([FromBody] CustomWalk walk, CancellationToken cancellationToken)
    {
        if (walk is null)
        {
            return BadRequest(new { message = "Walk data is required." });
        }

        if (string.IsNullOrWhiteSpace(walk.Id))
        {
            walk.Id = Guid.NewGuid().ToString();
        }

        // Always update in-memory cache as write-through fallback
        InMemoryWalks[walk.Id] = walk;

        if (IsDatabaseAvailable())
        {
            try
            {
                var existing = await _dbContext.CustomWalks.FindAsync([walk.Id], cancellationToken);

                if (existing is not null)
                {
                    _dbContext.Entry(existing).CurrentValues.SetValues(walk);
                    existing.SelectedFilters = walk.SelectedFilters;
                }
                else
                {
                    await _dbContext.CustomWalks.AddAsync(walk, cancellationToken);
                }

                await _dbContext.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Could not persist walk {WalkId} to PostgreSQL ({Message}). Saved to in-memory fallback.", walk.Id, ex.Message);
            }
        }

        return Ok(walk);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCustomWalk(string id, CancellationToken cancellationToken)
    {
        InMemoryWalks.TryRemove(id, out _);

        if (IsDatabaseAvailable())
        {
            try
            {
                var existing = await _dbContext.CustomWalks.FindAsync([id], cancellationToken);
                if (existing is not null)
                {
                    _dbContext.CustomWalks.Remove(existing);
                    await _dbContext.SaveChangesAsync(cancellationToken);
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Could not delete walk {WalkId} from PostgreSQL ({Message}).", id, ex.Message);
            }
        }

        return NoContent();
    }
}
