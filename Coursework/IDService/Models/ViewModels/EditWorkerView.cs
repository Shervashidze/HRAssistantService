using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WorkersInfoConsolidation.Models.ViewModels
{
    public class EditWorkerView
    {
        [Required]
        public string PhoneNumber { get; set; }
        
        [Required]
        public string Department { get; set; }
        
        [Required]
        public string Post { get; set; } 
        public string StaffCategory { get; set; }
        public string StaffType { get; set; }

        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Factory { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateOfBirth { get; set; }

        public List<int> CompetenceIdsList { get; set; }
    }
}
