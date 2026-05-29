using CaseySmartHub.Api.Models.Common;
using CaseySmartHub.Api.Models.Entities;
using CaseySmartHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CaseySmartHub.Api.Controllers;

[ApiController]
public sealed class BenchesController : ControllerBase
{
    private readonly IBenchService _benchService;
    private readonly ILogger<BenchesController> _logger;

    public BenchesController(IBenchService benchService, ILogger<BenchesController> logger)
    {
        _benchService = benchService;
        _logger = logger;
    }

    [HttpGet("api/GetBenches")]
    [ProducesResponseType(typeof(CaseyDataResponse<Bench>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status502BadGateway)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<CaseyDataResponse<Bench>>> GetBenches(CancellationToken cancellationToken)
    {
        try
        {
            var result = await _benchService.GetBenchesAsync(cancellationToken);
            return Ok(result);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Failed to reach the Casey Open Data API while fetching benches.");
            return Problem(
                detail: "Could not retrieve bench data from the Casey Open Data API. Please try again later.",
                statusCode: StatusCodes.Status502BadGateway,
                title: "Upstream API Error");
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            _logger.LogError(ex, "Unexpected error while fetching benches.");
            return Problem(
                detail: "An unexpected error occurred while processing the request.",
                statusCode: StatusCodes.Status500InternalServerError,
                title: "Internal Server Error");
        }
    }
}
