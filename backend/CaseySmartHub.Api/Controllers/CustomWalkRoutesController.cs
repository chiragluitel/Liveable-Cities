using CaseySmartHub.Api.Models.Routing;
using CaseySmartHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CaseySmartHub.Api.Controllers;

[ApiController]
public sealed class CustomWalkRoutesController : ControllerBase
{
    private readonly ICustomWalkRouteService _customWalkRouteService;
    private readonly ILogger<CustomWalkRoutesController> _logger;

    public CustomWalkRoutesController(
        ICustomWalkRouteService customWalkRouteService,
        ILogger<CustomWalkRoutesController> logger)
    {
        _customWalkRouteService = customWalkRouteService;
        _logger = logger;
    }

    [HttpPost("api/custom-walk-route")]
    [ProducesResponseType(typeof(CustomWalkRouteResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status502BadGateway)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<CustomWalkRouteResponse>> GetCustomWalkRoute(
        [FromBody] CustomWalkRouteRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            var result = await _customWalkRouteService.GetCustomWalkRouteAsync(
                request,
                cancellationToken);

            return Ok(result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Failed to reach OpenRouteService while generating a custom walk route.");

            return Problem(
                detail: "Could not generate the custom walk route from OpenRouteService. Please try again later.",
                statusCode: StatusCodes.Status502BadGateway,
                title: "Routing API Error");
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogError(ex, "Custom walk routing is not configured correctly.");

            return Problem(
                detail: ex.Message,
                statusCode: StatusCodes.Status500InternalServerError,
                title: "Routing Configuration Error");
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            _logger.LogError(ex, "Unexpected error while generating a custom walk route.");

            return Problem(
                detail: "An unexpected error occurred while generating the custom walk route.",
                statusCode: StatusCodes.Status500InternalServerError,
                title: "Internal Server Error");
        }
    }
}