using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LearningService.Models
{
    public class LearningEvent
    {
        [Key]
        public long Id { get; set; }
    }
}
