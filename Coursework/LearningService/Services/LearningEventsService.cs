using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LearningEvents.Models;
using Microsoft.EntityFrameworkCore;

namespace LearningEvents.Services
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

        public async Task<bool> Update(long id, LearningEvent learningEvent)
        {
            var ev = await GetEvent(id);
            ev.Workers = learningEvent.Workers;
            ev.MaxScore = learningEvent.MaxScore;
            ev.Name = learningEvent.Name;
            ev.PlannedDate = learningEvent.PlannedDate;
            ev.Description = learningEvent.Description;
            ev.CompetencesId = learningEvent.CompetencesId;
            await Context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteEvent(long id)
        {
            var ev = await GetEvent(id);
            Context.Set<LearningEvent>().Remove(ev);
            Context.SaveChanges();
            return true;
        }

        public async Task<LearningEvent[]> GetAllEvents()
        {
            return await Context.Set<LearningEvent>().ToArrayAsync();
        }
    }
}
