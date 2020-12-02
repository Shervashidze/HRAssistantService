using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coursework.Models
{
    public class StaffType : IEntity<int>
    {
        public int Id { get; set; }
        public string StaffTypeName { get; set; }
    }
}
