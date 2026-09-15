using TasklyServer.Models;

namespace TasklyServer.Interfaces
{
    public interface ITaskService
    {
        Task<List<ToDoTask>> GetAllAsync();

        Task<ToDoTask?> GetByIdAsync(int id);

        Task<ToDoTask> CreateAsync(ToDoTask task);

        Task<bool> UpdateAsync(int id, ToDoTask task);

        Task<bool> DeleteAsync(int id);
    }
}
