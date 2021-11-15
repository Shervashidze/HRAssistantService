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
            return await Context.Set<LearningEvent>().Include(c => c.Workers).FirstOrDefaultAsync(c => c.Id == id);
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
            if (learningEvent == null)
            {
                return false;
            }

            for (int i = 0; i < learningEvent.Workers.Count; i++)
            {
                var ad = await Context.Set<Worker>().FirstOrDefaultAsync(w => w.LearningEventId == id && w.WorkerId == learningEvent.Workers[i].WorkerId);
                var a = ad.Id;
                var w = Context.Set<Worker>().Find(a);
                Context.Set<Worker>().Remove(w);
                w.InitialScore = learningEvent.Workers[i].InitialScore;
                w.AfterwardsScore = learningEvent.Workers[i].AfterwardsScore;
                Context.Set<Worker>().Add(w);
                Context.SaveChanges();
            }
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
            return await Context.Set<LearningEvent>().Include(c => c.Workers).ToArrayAsync();
        }

        public async Task<LearningEvent[]> GetAllEventsById(long id)
        {
            return await Context.Set<LearningEvent>().Include(c => c.Workers.Where(cm => cm.WorkerId == id)).Where(c => c.Workers.Where(cm => cm.WorkerId == id).Count() > 0).ToArrayAsync();
        }

        public async Task<bool> SetFeedback(long eventId, long userId, Feedback feedback)
        {
            var find = Context.Set<Feedback>().Find(feedback.EventId, feedback.WorkerId);
            if (find != null)
            {
                Context.Set<Feedback>().Remove(find);
                Context.SaveChanges();
            }

            var res = await Context.Set<Feedback>().AddAsync(feedback);
            await Context.SaveChangesAsync();

            return true;
        }

        public async Task<Feedback> GetFeedbackAsync(long eventId, long userId)
        {
            return Context.Set<Feedback>().Find(eventId, userId);
        }

    }
}
