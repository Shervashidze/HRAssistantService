using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkersInfoConsolidation.Models;
using WorkersInfoConsolidation.Models.ViewModels;

namespace WorkersInfoConsolidation.Services
{
    public interface IWorkersService
    {
        Task<Worker> GetWorkerAsync(int id);
        Task<string> AddWorkerAsync(Worker worker);
        int DeleteWorker(int id);
        Task<Worker[]> GetAllWorkers();
    }
}
