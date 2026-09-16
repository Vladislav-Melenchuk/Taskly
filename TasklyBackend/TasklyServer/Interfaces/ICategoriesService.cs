using TasklyServer.Models;

namespace TasklyServer.Interfaces
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllAsync(int userId);

        Task<Category> CreateAsync(string name, int userId);

        Task<bool> DeleteAsync(int id, int userId);
    }
}