using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LearningService.Models;

namespace LearningService.Services
{
    public interface ILearningEventsService
    {
        Task<LearningEvent> GetEvent(long learningEventId);
        Task<long> AddLearningEventAsync(LearningEvent learningEvent);
    }
}
