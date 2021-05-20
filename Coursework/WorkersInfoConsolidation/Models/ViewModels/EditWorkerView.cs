using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WorkersInfoConsolidation.Models.ViewModels
{
    public class EditWorkerView
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Enter name")]
        public string Name { get; set; } // ФИО

        [Required]
        [StringLength(20)]
        public string PhoneNumber { get; set; }
        [Required]
        [RegularExpression("@.*?\\.", ErrorMessage = "Введите email правильно.")]
        public string Email { get; set; }
        [Required]
        public string Department { get; set; } // Подразделения
        [Required]
        public string Post { get; set; } // Должности
        [Required]
        public string Factory { get; set; } // Должности
        [Required]
        public string StaffCategory { get; set; } // Категории персонала
        [Required]
        public string StaffType { get; set; } // id Вида персонала
        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateOfBirth { get; set; }
    }
}
