using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LearningService.Models;
using Microsoft.EntityFrameworkCore;

namespace LearningService.Services
{
    public class LearningEventsService : ILearningEventsService
    {
        private readonly DbContext Context;
        public LearningEventsService(LearningServiceContext learningServiceContext)
        {
            Context = learningServiceContext;
        }

        public async Task<LearningEvent> GetEvent(long id)
        {
            return await Context.Set<LearningEvent>().FindAsync(id);
        }

        public async Task<long> AddLearningEventAsync(LearningEvent learningEvent)
        {
            await Context.AddAsync(learningEvent);
            await Context.SaveChangesAsync();
            return learningEvent.Id;
        }

        public async Task<LearningEvent[]> GetAllEvents()
        {
            return await Context.Set<LearningEvent>().ToArrayAsync();
        }
    }
}
