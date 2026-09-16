using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TasklyServer.DTOs;
using TasklyServer.Interfaces;

namespace TasklyServer.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var user = await _authService.RegisterAsync(dto);

            if (user == null)
            {
                return BadRequest("Логін вже зайнятий");
            }

            return Ok(new
            {
                user.Id,
                user.Login
            });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var token = await _authService.LoginAsync(dto);

            if (token == null)
            {
                return Unauthorized("Невірний логін або пароль");
            }

            return Ok(new
            {
                token
            });
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok(new
            {
                message = "Вихід виконано"
            });
        }
    }
}