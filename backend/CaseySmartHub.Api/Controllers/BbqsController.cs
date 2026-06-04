using CaseySmartHub.Api.Models.Common;
using CaseySmartHub.Api.Models.Entities;
using CaseySmartHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CaseySmartHub.Api.Controllers;

[ApiController]
public sealed class BbqsController : ControllerBase
{
    private readonly IBbqService _bbqService;
    private readonly ILogger<BbqsController> _logger;

    public BbqsController(
        IBbqService bbqService,
        ILogger<BbqsController> logger)
    {
        _bbqService = bbqService;
        _logger = logger;
    }

    [HttpGet("api/GetBbqs")]
    [ProducesResponseType(typeof(CaseyDataResponse<Bbq>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status502BadGateway)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<CaseyDataResponse<Bbq>>> GetBbqs(CancellationToken cancellationToken)
    {
        try
        {
            var result = await _bbqService.GetBbqsAsync(cancellationToken);
            return Ok(result);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Failed to reach Casey Open Data API while fetching barbecues.");

            return Problem(
                detail: "Could not retrieve barbecue data from the Casey Open Data API. Please try again later.",
                statusCode: StatusCodes.Status502BadGateway,
                title: "Upstream API Error");
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            _logger.LogError(ex, "Unexpected error while fetching barbecues.");

            return Problem(
                detail: "An unexpected error occurred while processing the request.",
                statusCode: StatusCodes.Status500InternalServerError,
                title: "Internal Server Error");
        }
    }
}