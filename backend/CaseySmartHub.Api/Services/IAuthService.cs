using CaseySmartHub.Api.Models.Entities;

namespace CaseySmartHub.Api.Services;

public interface IAuthService
{
    Task<User?> LoginAsync(string username, string password);
}