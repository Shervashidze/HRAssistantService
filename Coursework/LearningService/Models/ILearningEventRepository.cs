using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LearningService.Models
{
    public interface ILearningEventRepository
    {
        Task<long> AddAsync(LearningEvent item);
    }
}
