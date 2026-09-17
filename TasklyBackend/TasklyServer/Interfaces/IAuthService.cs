using TasklyServer.DTOs;
using TasklyServer.Models;

namespace TasklyServer.Interfaces
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(RegisterDto dto);

        Task<string?> LoginAsync(LoginDto dto);
    }
}