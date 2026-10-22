using CaseySmartHub.Api.Models.External;
using CaseySmartHub.Api.Models.Entities;
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

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Username) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new
            {
                message = "Username and password are required."
            });
        }

        var user = await _authService.RegisterAsync(
            request.Username,
            request.Password
        );

        if (user == null)
        {
            return Conflict(new
            {
                message = "Username already exists."
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