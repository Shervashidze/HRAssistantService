using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LearningEvents.Views
{
    public class WorkerEventsView
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? InitialScore { get; set; }
        public int? AfterwardsScore { get; set; }
        public string Feedback { get; set; }
    }
}
