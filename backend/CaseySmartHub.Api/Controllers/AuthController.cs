using CaseySmartHub.Api.Models.External;
using CaseySmartHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CaseySmartHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequestDto request)
    {
        var user = await _authService.LoginAsync(
            request.Username,
            request.Password
        );

        if (user == null)
        {
            return Unauthorized(new
            {
                authenticated = false
            });
        }

        return Ok(new
        {
            authenticated = true,
            id = user.Id,
            username = user.Username
        });
    }
}