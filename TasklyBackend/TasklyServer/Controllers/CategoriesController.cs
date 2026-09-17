using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TasklyServer.DTOs;
using TasklyServer.Interfaces;

namespace TasklyServer.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/categories")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }


        [HttpGet("get")]
        public async Task<IActionResult> GetAll()
        {
            var userId = GetUserId();

            var categories = await _categoryService.GetAllAsync(userId);

            return Ok(categories);
        }


        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateCategoryDto dto)
        {
            var userId = GetUserId();

            var category = await _categoryService.CreateAsync(
                dto.Name,
                userId
            );

            return Ok(category);
        }


        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetUserId();

            var result = await _categoryService.DeleteAsync(id, userId);

            if (!result)
            {
                return NotFound();
            }

            return Ok();
        }


        private int GetUserId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            return int.Parse(userId!);
        }
    }
}