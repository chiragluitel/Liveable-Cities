using CaseySmartHub.Application.Features.Permits.Queries.GetRecordByApplicationNumber;
using CaseySmartHub.Domain.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CaseySmartHub.Api.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class BuildingPermitController : ControllerBase
{
    private readonly IMediator _mediator;
    public BuildingPermitController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("get-permit-by-app-id")]
    public async Task<IActionResult> GetPermitByApplicationNumber ([FromQuery] GetRecordByApplicationNumberQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var permit = await _mediator.Send (new GetRecordByApplicationNumberQuery(request.ApplicationNumber), cancellationToken);
            return Ok(permit);
        }catch(ApplicationNotFoundException)
        {
            return NotFound(new {error = "Sorry, that record wasn't found"});
        }catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new {error = ex.Message});
        }
    }
}