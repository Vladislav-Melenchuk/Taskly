using TasklyServer.Models;

namespace TasklyServer.Interfaces
{
    public interface ITaskService
    {
        Task<(List<ToDoTask> Items, int TotalCount)> GetAllAsync(int userId, int page, int pageSize, string? search, int? categoryId);

        Task<ToDoTask?> GetByIdAsync(int id, int userId);

        Task<ToDoTask> CreateAsync(ToDoTask task, int userId);

        Task<bool> UpdateAsync(int id, ToDoTask task, int userId);

        Task<bool> DeleteAsync(int id, int userId);
    }
}
