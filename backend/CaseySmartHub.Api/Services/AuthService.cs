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

    public async Task<User?> RegisterAsync(string username, string password)
    {
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Username == username);

        if (existingUser != null)
        {
            return null;
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password)
        };

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return user;
    }
}