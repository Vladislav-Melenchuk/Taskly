using System.ComponentModel.DataAnnotations;

namespace TasklyServer.DTOs
{
    public class CreateCategoryDto
    {
        [Required(ErrorMessage = "Вкажіть назву")]
        [MaxLength(50, ErrorMessage = "Максимум 50 символів")]
        public string Name { get; set; } = string.Empty;
    }
}