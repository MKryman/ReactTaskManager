using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Homework_06_19.Data
{
    public class TaskRepository
    {
        private readonly string _connectionString;

        public TaskRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<TaskItem> GetCurrentTasks()
        {
            var context = new TaskContext(_connectionString);
            return context.Tasks.Include(t => t.User)
                .Where(t => t.TaskStatus != Status.Done)
                .ToList();
        }

        public void NewTask(TaskItem item)
        {
            var context = new TaskContext(_connectionString);
            context.Add(item);
            context.SaveChanges();
        }

        public void UpdateTaskStatus(TaskItem item)
        {
            var context = new TaskContext(_connectionString);
            context.Update(item);
            context.SaveChanges();
        }


    }
}
