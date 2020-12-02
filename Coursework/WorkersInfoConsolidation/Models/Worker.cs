using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Coursework.Models
{
    public class Worker : IEntity<int>
    {
        public int Id { get; set; }
        public string PersonnelNumber { get; set; } // Табельный номер
        public string PhoneNumber { get; set; }

        public int DepartmentId { get; set; } // id Подразделения
        public int PostId { get; set; } // id Должности
        public int StaffCategoryId { get; set; } // id Категории персонала
        public int StaffTypeId { get; set; } // id Вида персонала
        public int SecurityGroup { get; set; } // Группа по эл. безопасности

        public string Name { get; set; } // ФИО
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
