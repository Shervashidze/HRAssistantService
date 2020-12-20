using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LearningService.Models
{
    public class Competence : IEntity
    {
        [Key]
        public long Id { get; set; }

        public long CompetenceId { get; set; }

        public long LearningEventId { get; set; }
    }
}
