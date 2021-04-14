using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkersInfoConsolidation.Models.ViewModels
{
    public class EditAccountViewModel
    {
        public string UserName { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
