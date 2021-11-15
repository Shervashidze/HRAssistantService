using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LearningEvents.Models
{
    public class LearningEvent
    {
        [Key]
        public long Id { get; set; }

        public string Name { get; set; }

        public string PlannedDate { get; set; }

        public List<Competence> CompetencesId { get; set; } = new List<Competence>();

        public List<Worker> Workers { get; set; } = new List<Worker>();

        public int MaxScore { get; set; }

        public string Description { get; set; }
    }
}
