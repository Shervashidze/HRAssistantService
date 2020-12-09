using Microsoft.AspNetCore.Mvc;
using WorkersInfoConsolidation.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkersInfoConsolidation.Services;
using WorkersInfoConsolidation.Models.ViewModels;
using AutoMapper;

namespace WorkersInfoConsolidation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkersController : Controller
    {
        private readonly IWorkersService workersService;
        private readonly IMapper workersMapper;

        public WorkersController(IWorkersService workersService, IMapper workersMapper)
        {
            this.workersService = workersService;
            this.workersMapper = workersMapper;
        }

        public IActionResult Index()
            => View("Index");

        [HttpGet("All")]
        public async Task<Worker[]> GetAll()
        {
            return await workersService.GetAllWorkers();
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddWorker([FromBody] CreateWorkerView workerView)
        {
            var worker = workersMapper.Map<Worker>(workerView);
            var id = await workersService.AddWorkerAsync(worker);
            return Ok(id);
        }

        [HttpGet("Worker/{id}")]
        public async Task<IActionResult> GetWorker(int id)
        {
            var worker = await workersService.GetWorkerAsync(id);
            return worker == null
                ? NotFound()
                : Ok(worker) as IActionResult;
        }

        [HttpDelete("Delete/{id}")]
        public int DeleteWorker (int id)
        {
            return workersService.DeleteWorker(id);
        }
    }
}

