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

        public async Task<List<ToDoTask>> GetAllAsync()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<ToDoTask?> GetByIdAsync(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task<ToDoTask> CreateAsync(ToDoTask task)
        {
            _context.Tasks.Add(task);

            await _context.SaveChangesAsync();

            return task;
        }

        public async Task<bool> UpdateAsync(int id, ToDoTask task)
        {
            var existingTask = await _context.Tasks.FindAsync(id);

            if (existingTask == null)
            {
                return false;
            }

            existingTask.Title = task.Title;
            existingTask.Description = task.Description;
            existingTask.IsCompleted = task.IsCompleted;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

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
