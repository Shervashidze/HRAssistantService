using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LearningEvents.Views
{
    public class EventRow
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string Capacity { get; set; }

        public string Description { get; set; }

        public string PlannedDate { get; set; }
    }
}
