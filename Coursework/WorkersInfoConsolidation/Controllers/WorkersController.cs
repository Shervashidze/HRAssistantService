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
using System.IO;
using OfficeOpenXml;

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

        [HttpPost("Edit/{id}")]
        public async Task<IActionResult> EditWorker(int id, [FromBody] EditWorkerView workerView)
        {
            workersService.DeleteWorker(id);
            var worker = workersMapper.Map<Worker>(workerView);
            var new_id = await workersService.AddWorkerAsync(worker);
            return Ok(new_id);
        }

        [HttpGet("Worker/{id}")]
        public async Task<IActionResult> GetWorker(int id)
        {
            var worker = await workersService.GetWorkerAsync(id);
            return worker == null
                ? NotFound()
                : Ok(worker) as IActionResult;
        }

        [HttpGet("WorkerByEmail/{email}")]
        public async Task<IActionResult> GetWorkerByEmail(string email)
        {
            var worker = await workersService.GetWorkerByEmailAsync(email);
            return worker == null
                ? NotFound()
                : Ok(worker) as IActionResult;
        }

        [HttpDelete("Delete/{id}")]
        public int DeleteWorker (int id)
        {
            return workersService.DeleteWorker(id);
        }

        [HttpGet("Excel")]
        public async Task<IActionResult> ExportWorkersToExcel()
        {
            var workers = await workersService.GetAllWorkers();
            var memStream = new MemoryStream();

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using (var package = new ExcelPackage(memStream))
            {
                var returnSheet = package.Workbook.Worksheets.Add("Сотрудники");
                returnSheet.Cells.LoadFromCollection(workers, true);
                package.Save();
            }

            memStream.Position = 0;
            var excelName = $"WorkersList.xlsx";

            return File(memStream, "application/vmd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }
    }
}

