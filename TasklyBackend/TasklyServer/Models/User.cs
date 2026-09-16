namespace TasklyServer.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Login { get; set; } = string.Empty;

        public string PasswordHash { get; set; } = string.Empty;

        public List<ToDoTask> Tasks { get; set; } = new();

        public List<Category> Categories { get; set; } = new();
    }
}
