using CaseySmartHub.Api.Models.Common;
using CaseySmartHub.Api.Models.Entities;
using CaseySmartHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CaseySmartHub.Api.Controllers;

[ApiController]
public sealed class DrinkingFountainsController : ControllerBase
{
    private readonly IDrinkingFountainService _drinkingFountainService;
    private readonly ILogger<DrinkingFountainsController> _logger;

    public DrinkingFountainsController(
        IDrinkingFountainService drinkingFountainService,
        ILogger<DrinkingFountainsController> logger)
    {
        _drinkingFountainService = drinkingFountainService;
        _logger = logger;
    }

    [HttpGet("api/GetDrinkingFountains")]
    [ProducesResponseType(typeof(CaseyDataResponse<DrinkingFountain>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status502BadGateway)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<CaseyDataResponse<DrinkingFountain>>> GetDrinkingFountains(CancellationToken cancellationToken)
    {
        try
        {
            var result = await _drinkingFountainService.GetDrinkingFountainsAsync(cancellationToken);
            return Ok(result);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Failed to reach the Casey Open Data API while fetching drinking fountains.");
            return Problem(
                detail: "Could not retrieve drinking fountain data from the Casey Open Data API. Please try again later.",
                statusCode: StatusCodes.Status502BadGateway,
                title: "Upstream API Error");
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            _logger.LogError(ex, "Unexpected error while fetching drinking fountains.");
            return Problem(
                detail: "An unexpected error occurred while processing the request.",
                statusCode: StatusCodes.Status500InternalServerError,
                title: "Internal Server Error");
        }
    }
}
