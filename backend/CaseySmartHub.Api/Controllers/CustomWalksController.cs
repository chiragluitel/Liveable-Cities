using CaseySmartHub.Api.Models.Entities;
using CaseySmartHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CaseySmartHub.Api.Controllers;

[ApiController]
public sealed class CustomWalksController : ControllerBase
{
    private readonly ICustomWalkService _service;
    private readonly ILogger<CustomWalksController> _logger;

    public CustomWalksController(ICustomWalkService service, ILogger<CustomWalksController> logger)
    {
        _service = service;
        _logger = logger;
    }

    [HttpGet("api/CustomWalks")]
    [ProducesResponseType(typeof(IReadOnlyList<CustomWalk>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<CustomWalk>>> GetCustomWalks(
        [FromQuery] string userId,
        CancellationToken cancellationToken)
    {
        var walks = await _service.GetByUserIdAsync(userId, cancellationToken);
        return Ok(walks);
    }

    [HttpPost("api/CustomWalks")]
    [ProducesResponseType(typeof(CustomWalk), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CustomWalk>> CreateCustomWalk(
        [FromBody] CustomWalk walk,
        CancellationToken cancellationToken)
    {
        walk.Id = 0;
        var created = await _service.CreateAsync(walk, cancellationToken);
        return CreatedAtAction(nameof(GetCustomWalks), new { userId = created.UserId }, created);
    }

    [HttpPut("api/CustomWalks/{id:int}")]
    [ProducesResponseType(typeof(CustomWalk), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CustomWalk>> UpdateCustomWalk(
        int id,
        [FromBody] CustomWalk walk,
        CancellationToken cancellationToken)
    {
        var updated = await _service.UpdateAsync(id, walk, cancellationToken);
        if (updated is null) return NotFound();
        return Ok(updated);
    }

    [HttpDelete("api/CustomWalks/{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteCustomWalk(int id, CancellationToken cancellationToken)
    {
        var deleted = await _service.DeleteAsync(id, cancellationToken);
        if (!deleted) return NotFound();
        return NoContent();
    }
}
