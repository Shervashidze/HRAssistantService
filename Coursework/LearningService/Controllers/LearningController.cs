﻿using LearningService.Models;
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

        public LearningController(ILearningEventsService learningService)
        {
            _learningService = learningService;

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<AplProfile>();
            });
            _mapper = config.CreateMapper();
        }

        [HttpGet]
        public async Task<IActionResult> GetLearningEvent(int id)
        {
            var eve = await _learningService.GetEvent(id);
            return eve == null 
                ? NotFound()
                : Ok(eve) as IActionResult;
        }

        [HttpGet]
        public async Task<EventRow[]> All()
        {
            var events = await _learningService.GetAllEvents();
            var rows = _mapper.Map<EventRow[]>(events);
            foreach (var r in rows)
            { 
                r.Capacity = "42%";
            }

            return rows;
        }

        [HttpPost]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] LearningEventView learningEventView)
        { 
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            await _learningService.DeleteEvent(id);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CreateLearningEvent([FromBody] LearningEventView learningEventView)
        {
            var lEvent = _mapper.Map<LearningEvent>(learningEventView);
            var id = await _learningService.AddLearningEventAsync(lEvent).ConfigureAwait(false);
            await GetLearningEvent((int) id);
            return Ok(id);
        }
    }
}
