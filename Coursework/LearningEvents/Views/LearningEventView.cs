using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using LearningEvents.Models;

namespace LearningEvents.Views
{
    public class LearningEventView
    {
        public long Id { get; set; }

        public string Name { get; set; }


        public string PlannedDate { get; set; }

        public List<Competence> CompetencesId { get; set; } = new List<Competence>();

        public List<WorkerView> Workers { get; set; } = new List<WorkerView>();

        public int MaxScore { get; set; }

        public string Description { get; set; }
    }
}
