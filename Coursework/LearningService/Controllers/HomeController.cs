using LearningService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using LearningService.Services;

namespace LearningService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ILearningEventsService _learningService;

        public HomeController(ILogger<HomeController> logger, ILearningEventsService learningService)
        {
            _logger = logger;
            _learningService = learningService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("{eventId}")]
        public async Task<IActionResult> GetCoursesGroups(long eventId)
        {
            var groups = await _learningService.GetEvent(eventId);
            return Ok(groups);
        }

        public IActionResult Privacy()
        {
            return View();
        }
    }
}
