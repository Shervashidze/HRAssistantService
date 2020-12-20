using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LearningService.Views
{
    public class WorkerView
    {
        public long Id { get; set; }

        public long LearningEventId { get; set; }

        public string Feedback { get; set; }

        public int? InitialScore { get; set; }

        public int? AfterwardsScore { get; set; }

        public string Description { get; set; }
    }
}
