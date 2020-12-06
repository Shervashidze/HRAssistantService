using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LearningService.Models;

namespace LearningService.Models
{
    public class LearningEventRepository : ILearningEventRepository
    {
        DbContext Context;
        public LearningEventRepository(LearningServiceContext context)
        {
            Context = context;
        }

        public async Task<long> AddAsync(LearningEvent item)
        {
            await Context.AddAsync(item);
            try
            {
                await Context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine("HELLLOOOO I AM HERE    " + e.InnerException.Message);
            }

            return item.Id;
        }
    }
}
