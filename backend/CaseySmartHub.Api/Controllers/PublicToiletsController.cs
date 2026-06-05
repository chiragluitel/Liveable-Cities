using CaseySmartHub.Api.Models.Common;
using CaseySmartHub.Api.Models.Entities;
using CaseySmartHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CaseySmartHub.Api.Controllers;

[ApiController]
public sealed class PublicToiletsController : ControllerBase
{
    private readonly IPublicToiletService _publicToiletService;
    private readonly ILogger<PublicToiletsController> _logger;

    public PublicToiletsController(
        IPublicToiletService publicToiletService,
        ILogger<PublicToiletsController> logger)
    {
        _publicToiletService = publicToiletService;
        _logger = logger;
    }

    [HttpGet("api/GetPublicToilets")]
    [ProducesResponseType(typeof(CaseyDataResponse<PublicToilet>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status502BadGateway)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<CaseyDataResponse<PublicToilet>>> GetPublicToilets(CancellationToken cancellationToken)
    {
        try
        {
            var result = await _publicToiletService.GetPublicToiletsAsync(cancellationToken);

            return Ok(result);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Failed to reach the Casey Open Data API while fetching toilets.");

            return Problem(
                detail: "Could not retriece toilet data from the Casey Open Data API. Please try again later.",
                statusCode: StatusCodes.Status502BadGateway,
                title: "Upstream API Error");
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            _logger.LogError(ex, "Unexpected error while fetching toilets.");

            return Problem(
                detail: "An unexpected error occured while processing the request.",
                statusCode: StatusCodes.Status500InternalServerError,
                title: "Internal Server Error"
            );
        }

    }
}