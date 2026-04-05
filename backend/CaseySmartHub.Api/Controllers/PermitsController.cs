using CaseySmartHub.Application.Features.Permits.Commands;
using CaseySmartHub.Application.Features.Permits.Commands.SavePermit;
using CaseySmartHub.Application.Features.Permits.Queries;
using CaseySmartHub.Domain.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CaseySmartHub.Api.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class PermitsController : ControllerBase
{
    private readonly IMediator _mediator;

    public PermitsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("save-to-user")]
    public async Task<IActionResult> SaveUserPermit([FromBody] SaveUserPermitCommand command)
    {
        try
        {
            var success = await _mediator.Send(command);
            if (success)
            {
                return Ok(new { message = "Permit successfully saved to user profile." });
            }
            return BadRequest(new { error = "Failed to save the permit." });
        }
        catch (PermitNotFoundException ex)
        {
            return NotFound(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An unexpected error occurred." + ex.Message });
        }
    }

    [HttpGet ("get-all-permits")]
    public async Task<IActionResult> GetAllPermits(CancellationToken cancellationToken)
    {
        try
        {
            var permits = await _mediator.Send(new GetAllPermitsQuery(), cancellationToken);
            return Ok(permits);
        }catch(Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new {error = "An unexpected error occued" + ex.Message});
        }
        
        
    }
}