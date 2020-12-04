using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkersInfoConsolidation.Models
{
    public class StaffCategory : IEntity<int>
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
    }
}
