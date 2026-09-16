using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TasklyServer.DTOs;
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
            var userId = GetUserId();

            var tasks = await _taskService.GetAllAsync(userId);

            return Ok(tasks);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userId = GetUserId();

            var task = await _taskService.GetByIdAsync(id, userId);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateTaskDto dto)
        {
            var userId = GetUserId();

            var task = new ToDoTask
            {
                Title = dto.Title,
                Description = dto.Description,
                IsCompleted = dto.IsCompleted,
                CategoryId = dto.CategoryId
            };

            var createdTask = await _taskService.CreateAsync(task, userId);

            return Ok(createdTask);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, UpdateTaskDto dto)
        {
            var userId = GetUserId();

            var task = new ToDoTask
            {
                Title = dto.Title,
                Description = dto.Description,
                IsCompleted = dto.IsCompleted,
                CategoryId = dto.CategoryId
            };

            var result = await _taskService.UpdateAsync(id, task, userId);

            if (!result)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetUserId();
            var result = await _taskService.DeleteAsync(id, userId);

            if (!result)
            {
                return NotFound();
            }

            return Ok();
        }

        private int GetUserId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                throw new UnauthorizedAccessException();
            }

            return int.Parse(userId);
        }
    }
}