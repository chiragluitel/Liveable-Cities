using CaseySmartHub.Api.Models.Common;
using CaseySmartHub.Api.Models.Entities;
using CaseySmartHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CaseySmartHub.Api.Controllers;

[ApiController]
public sealed class LibrariesController : ControllerBase
{
    private readonly ILibraryService _libraryService;
    private readonly ILogger<LibrariesController> _logger;

    public LibrariesController(
        ILibraryService libraryService,
        ILogger<LibrariesController> logger)
    {
        _libraryService = libraryService;
        _logger = logger;
    }

    [HttpGet("api/GetLibraries")]
    [ProducesResponseType(typeof(CaseyDataResponse<Library>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status502BadGateway)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<CaseyDataResponse<Library>>> GetLibraries(CancellationToken cancellationToken)
    {
        try
        {
            var result = await _libraryService.GetLibrariesAsync(cancellationToken);
            return Ok(result);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Failed to reach Casey Open Data API while fetching libraries.");

            return Problem(
                detail: "Could not retrieve library data from the Casey Open Data API. Please try again later.",
                statusCode: StatusCodes.Status502BadGateway,
                title: "Upstream API Error");
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            _logger.LogError(ex, "Unexpected error while fetching libraries.");

            return Problem(
                detail: "An unexpected error occurred while processing the request.",
                statusCode: StatusCodes.Status500InternalServerError,
                title: "Internal Server Error");
        }
    }
}