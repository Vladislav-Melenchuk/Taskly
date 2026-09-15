using System.ComponentModel.DataAnnotations;

namespace TasklyServer.DTOs
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Вкажіть логін")]
        public string Login { get; set; } = string.Empty;

        [Required(ErrorMessage = "Вкажіть пароль")]
        public string Password { get; set; } = string.Empty;
    }
}