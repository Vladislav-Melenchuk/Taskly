using Microsoft.EntityFrameworkCore;
using TasklyServer.Models;

namespace TasklyServer.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<ToDoTask> Tasks { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(
                new Category
                {
                    Id = 1,
                    Name = "Работа",
                    IsDefault = true
                },
                new Category
                {
                    Id = 2,
                    Name = "Учёба",
                    IsDefault = true
                },
                new Category
                {
                    Id = 3,
                    Name = "Личное",
                    IsDefault = true
                }
            );
        }

    }


}
