using Homework_06_19.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Homework_06_19.Web.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private IHubContext<TasksHub> _hub;
        private readonly string _connectionString;

        public TasksController(IHubContext<TasksHub> hub, IConfiguration config)
        {
            _hub = hub;
            _connectionString = config.GetConnectionString("conStr");
        }

        [HttpGet]
        [Route("alltasks")]
        public List<TaskItem> GetTasks()
        {
            var repo = new TaskRepository(_connectionString);
            return repo.GetCurrentTasks();
        }

        [HttpPost]
        [Route("addtask")]
        public void Add(TaskItem item)
        {
            var repo = new TaskRepository(_connectionString);
            repo.NewTask(item);
            _hub.Clients.All.SendAsync("newTask", item);

        }

        [HttpPost]
        [Route("updatetaskstatus")]
        public void UpdateStatus(TaskItem item)
        {
            var repo = new TaskRepository(_connectionString);
            repo.UpdateTaskStatus(item);
            var allTasks = repo.GetCurrentTasks();
            _hub.Clients.All.SendAsync("updateTaskList", allTasks);
        }

    }
}
