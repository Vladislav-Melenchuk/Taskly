using System.ComponentModel.DataAnnotations;

namespace TasklyServer.DTOs
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "Вкажіть логін")]
        [MinLength(3, ErrorMessage = "Мінімум 3 символи")]
        public string Login { get; set; } = string.Empty;

        [Required(ErrorMessage = "Вкажіть пароль")]
        [MinLength(6, ErrorMessage = "Мінімум 6 символів")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Повторіть пароль")]
        [Compare("Password", ErrorMessage = "Паролі не збігаються")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}