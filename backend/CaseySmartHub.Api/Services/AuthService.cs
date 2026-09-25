using CaseySmartHub.Api.Data;
using CaseySmartHub.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace CaseySmartHub.Api.Services;

public class AuthService : IAuthService
{
    private readonly CaseyDbContext _context;

    public AuthService(CaseyDbContext context)
    {
        _context = context;
    }

    public async Task<User?> LoginAsync(string username, string password)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Username == username);

        if (user == null)
        {
            return null;
        }

        bool passwordValid = BCrypt.Net.BCrypt.Verify(
            password,
            user.PasswordHash
        );

        if (!passwordValid)
        {
            return null;
        }

        return user;
    }
}