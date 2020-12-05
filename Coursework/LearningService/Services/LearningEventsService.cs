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
        private readonly DbContext dbContext;
        public LearningEventsService(LearningServiceContext learningServiceContext)
        {
            dbContext = learningServiceContext;
        }

        public async Task<LearningEvent> GetEvent(long learningEventId)
        {
            return await dbContext.Set<LearningEvent>().Include(c => c.Workers).AsNoTracking().FirstOrDefaultAsync(c => c.Id == learningEventId).ConfigureAwait(false);
        }

        public async Task<long> AddLearningEventAsync(LearningEvent learningEvent)
        {
            await dbContext.AddAsync(learningEvent);
            await dbContext.SaveChangesAsync();
            return learningEvent.Id;
        }
    }
}
