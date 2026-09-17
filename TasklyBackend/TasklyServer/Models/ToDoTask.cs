namespace TasklyServer.Models
{
    public class ToDoTask
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public bool IsCompleted { get; set; }


        //Category
        public int? CategoryId { get; set; }

        public Category? Category { get; set; }

        //User
        public int UserId { get; set; }

        public User User { get; set; } = null!;

    }
}
