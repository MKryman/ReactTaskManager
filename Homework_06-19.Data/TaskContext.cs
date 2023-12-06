using Microsoft.EntityFrameworkCore;

namespace Homework_06_19.Data
{
    public class TaskContext : DbContext
    {
        private readonly string _connectionString;

        public TaskContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<TaskItem> Tasks { get; set; }
    }
}