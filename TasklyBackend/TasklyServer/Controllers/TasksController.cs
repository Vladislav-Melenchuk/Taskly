using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TasklyServer.Interfaces;
using TasklyServer.Models;

namespace TasklyServer.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/tasks")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetAll()
        {
            var tasks = await _taskService.GetAllAsync();

            return Ok(tasks);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var task = await _taskService.GetByIdAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(ToDoTask task)
        {
            var createdTask = await _taskService.CreateAsync(task);

            return Ok(createdTask);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, ToDoTask task)
        {
            var result = await _taskService.UpdateAsync(id, task);

            if (!result)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _taskService.DeleteAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}