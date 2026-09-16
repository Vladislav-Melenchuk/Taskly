using TasklyServer.Models;

namespace TasklyServer.Interfaces
{
    public interface ITaskService
    {
        Task<List<ToDoTask>> GetAllAsync(int userId);

        Task<ToDoTask?> GetByIdAsync(int id, int userId);

        Task<ToDoTask> CreateAsync(ToDoTask task, int userId);

        Task<bool> UpdateAsync(int id, ToDoTask task, int userId);

        Task<bool> DeleteAsync(int id, int userId);
    }
}
