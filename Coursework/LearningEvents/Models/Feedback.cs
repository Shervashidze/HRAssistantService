using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LearningEvents.Models
{
    public class Feedback : IEntity
    {
        public long WorkerId { get; set; }

        public long EventId { get; set; }

        public long Actuallity { get; set; }

        public string ActuallityComment { get; set; }

        public long Score { get; set; }

        public string ScoreComment { get; set; }

        public long Useability { get; set; }

        public string Difficulties { get; set; }

        public string NewLearnings { get; set; }

        public string Suggestions { get; set; }

        public long Id { get; set; }
    }
}
