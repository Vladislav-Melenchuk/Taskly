using Microsoft.EntityFrameworkCore;
using TasklyServer.Data;
using TasklyServer.Interfaces;
using TasklyServer.Models;

namespace TasklyServer.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;

        public CategoryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetAllAsync(int userId)
        {
            return await _context.Categories
                .Where(category =>
                    category.IsDefault ||
                    category.UserId == userId)
                .ToListAsync();
        }

        public async Task<Category> CreateAsync(string name, int userId)
        {
            var category = new Category
            {
                Name = name,
                IsDefault = false,
                UserId = userId
            };

            _context.Categories.Add(category);

            await _context.SaveChangesAsync();

            return category;
        }

        public async Task<bool> DeleteAsync(int id, int userId)
        {
            var category = await _context.Categories
                .FirstOrDefaultAsync(category =>
                    category.Id == id &&
                    category.UserId == userId &&
                    !category.IsDefault);

            if (category == null)
            {
                return false;
            }

            _context.Categories.Remove(category);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}