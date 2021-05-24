using System.ComponentModel.DataAnnotations;

namespace WorkersInfoConsolidation.Models.ViewModels
{
    public class CreateWorkerView
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Department { get; set; }
        public string Post { get; set; }
    }
}
