using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace WorkersInfoConsolidation.Models
{
    public class Worker : IdentityUser
    {
        public string Name { get; set; } 

        public string Department { get; set; } // Подразделения
        public string Post { get; set; } // Должности
        public string StaffCategory { get; set; } // Категории персонала
        public string StaffType { get; set; } // id Вида персонала

        public string Factory { get; set; } // Производство
        
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateOfBirth { get; set; }

        public Worker()
        {
        }
    }
}
