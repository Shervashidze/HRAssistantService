﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LearningEvents.Models;

namespace LearningEvents.Services
{
    public interface ILearningEventsService
    {
        Task<LearningEvent> GetEvent(long learningEventId);
        Task<LearningEvent[]> GetAllEvents();
        Task<long> AddLearningEventAsync(LearningEvent learningEvent);
        Task<bool> Update(long id, LearningEvent learningEvent);
        Task<bool> DeleteEvent(long id);
        Task<LearningEvent[]> GetAllEventsById(long id);
        Task<Feedback> GetFeedbackAsync(long eventId, long userId);
        Task<bool> SetFeedback(long eventId, long userId, Feedback feedback);
    }
}
