﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WorkersInfoConsolidation.Models
{
    public class Worker : IEntity<int>
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } // ФИО
        public string PhoneNumber { get; set; }

        public string Department { get; set; } // Подразделения
        public string Post { get; set; } // Должности
        public string StaffCategory { get; set; } // Категории персонала
        public string StaffType { get; set; } // id Вида персонала

        
        public string Factory { get; set; } // Производство
        
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateOfBirth { get; set; }

        public List<int> CompetenceIdsList { get; set; }

        public Worker()
        {
            CompetenceIdsList = new List<int>();
        }

    }
}
