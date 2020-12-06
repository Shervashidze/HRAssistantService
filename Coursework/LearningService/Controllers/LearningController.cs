using LearningService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using LearningService.Services;
using AutoMapper;
using LearningService.Views;

namespace LearningService.Controllers
{
    public class LearningController : Controller
    {
        private readonly ILearningEventsService _learningService;
        private readonly IMapper _mapper;

        public LearningController(ILogger<LearningController> logger, ILearningEventsService learningService)
        {
            _learningService = learningService;

            _learningService.AddLearningEventAsync(new LearningEvent {Id = 3, MaxScore = 20, CompetencesId = null, ActualDate = new DateTime(2020, 12, 20, 8, 30 , 0), PlannedDate = new DateTime(2020, 12, 19, 8, 30, 0) });

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<AplProfile>();
            });
            _mapper = config.CreateMapper();
        }

        [HttpGet]
        public async Task<IActionResult> GetLearningEvent(int id)
        {
            var groups = await _learningService.GetEvent(id);
            return Ok(groups);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(42);
        }

        [HttpPost]
        public async Task<IActionResult> CreateLearningEvent([FromBody] LearningEventView learningEventView)
        {
            var lEvent = _mapper.Map<LearningEvent>(learningEventView);
            var id = await _learningService.AddLearningEventAsync(lEvent).ConfigureAwait(false);
            return Ok(id);
        }
    }
}
