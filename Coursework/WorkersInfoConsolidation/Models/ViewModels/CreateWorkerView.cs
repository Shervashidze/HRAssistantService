using System;
using System.ComponentModel.DataAnnotations;

namespace WorkersInfoConsolidation.Models.ViewModels
{
    public class CreateWorkerView
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Enter name")]
        public string Name { get; set; } // ФИО
        
        [StringLength(20)]
        public string PhoneNumber { get; set; }
        
        [RegularExpression("@.*?\\.", ErrorMessage = "Введите email правильно.")]
        public string Email { get; set; }
        public string Department { get; set; } // Подразделения
        public string Post { get; set; } // Должности
        public string Factory { get; set; } // Должности
        public string StaffCategory { get; set; } // Категории персонала
        public string StaffType { get; set; } // id Вида персонала

        //[DataType(DataType.Date)]
        //[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        //public DateTime DateOfBirth { get; set; }
    }
}
