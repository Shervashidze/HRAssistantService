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
        private readonly ILearningEventRepository _learningEventRepository;
        public LearningEventsService(LearningServiceContext learningServiceContext, ILearningEventRepository learningEventRepository)
        {
            dbContext = learningServiceContext;
            _learningEventRepository = learningEventRepository;
        }

        public async Task<LearningEvent> GetEvent(long id)
        {
            return await dbContext.Set<LearningEvent>().FindAsync(id);
        }

        public async Task<long> AddLearningEventAsync(LearningEvent learningEvent)
        {
            return await _learningEventRepository.AddAsync(learningEvent);
        }
    }
}
