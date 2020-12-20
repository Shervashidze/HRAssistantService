using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using LearningService.Models;

namespace LearningService.Views
{
    public class LearningEventView
    {
        public long Id { get; set; }

        public string Name { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime PlannedDate { get; set; }

        public List<Competence> CompetencesId { get; set; } = new List<Competence>();

        public List<WorkerView> Workers { get; set; } = new List<WorkerView>();

        public int MaxScore { get; set; }

        public string Description { get; set; }
    }
}
