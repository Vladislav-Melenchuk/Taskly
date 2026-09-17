using Microsoft.EntityFrameworkCore;
using TasklyServer.Data;
using TasklyServer.Interfaces;
using TasklyServer.Models;

namespace TasklyServer.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }


        public async Task<(List<ToDoTask> Items, int TotalCount)> GetAllAsync(int userId, int page, int pageSize, string? search, int? categoryId)
        {
            var query = _context.Tasks.Where(task => task.UserId == userId);  
            
            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(task =>task.Title.Contains(search));
            }

            if (categoryId.HasValue)
            {
                query = query.Where(task => task.CategoryId == categoryId.Value);
            }

            var totalCount = await query.CountAsync();

            var items = await query
                .OrderBy(task => task.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (items, totalCount);
        }


        public async Task<ToDoTask?> GetByIdAsync(int id, int userId)
        {
            return await _context.Tasks
                .FirstOrDefaultAsync(task =>
                    task.Id == id &&
                    task.UserId == userId);
        }


        public async Task<ToDoTask> CreateAsync(ToDoTask task, int userId)
        {
            task.UserId = userId;

            _context.Tasks.Add(task);

            await _context.SaveChangesAsync();

            return task;
        }


        public async Task<bool> UpdateAsync(
            int id,
            ToDoTask task,
            int userId)
        {
            var existingTask = await _context.Tasks
                .FirstOrDefaultAsync(task =>
                    task.Id == id &&
                    task.UserId == userId);

            if (existingTask == null)
            {
                return false;
            }

            existingTask.Title = task.Title;
            existingTask.Description = task.Description;
            existingTask.IsCompleted = task.IsCompleted;
            existingTask.CategoryId = task.CategoryId;

            await _context.SaveChangesAsync();

            return true;
        }


        public async Task<bool> DeleteAsync(int id, int userId)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(task =>
                    task.Id == id &&
                    task.UserId == userId);

            if (task == null)
            {
                return false;
            }

            _context.Tasks.Remove(task);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}