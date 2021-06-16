using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WorkersInfoConsolidation.Models;
using WorkersInfoConsolidation.Models.ViewModels;


namespace WorkersInfoConsolidation.Services
{
    public class WorkersService : IWorkersService
    {
        private WorkersDbContext dbContext;
        public WorkersService(WorkersDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Worker> GetWorkerAsync(int id)
        {
            return await dbContext.Set<Worker>().FindAsync(id);
        }

        public async Task<Worker> GetWorkerByEmailAsync(string email)
        {
            var worker = await dbContext.Set<Worker>()
                .FirstOrDefaultAsync(worker => worker.Email == email);
            
            return worker;
        }

        public async Task<int> AddWorkerAsync(Worker worker)
        {
            await dbContext.AddAsync(worker);
            await dbContext.SaveChangesAsync();
            return worker.Id;
        }

        public int DeleteWorker(int id)
        {
            try
            {
                Worker worker = dbContext.Workers.Find(id);
                dbContext.Workers.Remove(worker);
                dbContext.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public async Task<Worker[]> GetAllWorkers()
        {
            return await dbContext.Set<Worker>().ToArrayAsync();
        }

        public async Task<string[]> GetAllFactories()
        {
            return await dbContext.Set<Worker>()
                .Select(w => w.Factory).Distinct().ToArrayAsync();
        }

        public async Task<Worker[]> GetFactoryWorkers(string name)
        {
            return await dbContext.Set<Worker>()
                .Where(w => w.Factory.ToLower() == name.ToLower())
                .ToArrayAsync();
        }
    }
}
