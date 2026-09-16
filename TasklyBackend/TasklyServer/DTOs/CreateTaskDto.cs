namespace TasklyServer.DTOs
{
    public class CreateTaskDto
    {
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public bool IsCompleted { get; set; }

        public int? CategoryId { get; set; }
    }
}