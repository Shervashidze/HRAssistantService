using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkersInfoConsolidation.Models
{
    public class Post : IEntity<int>
    {
        public int Id { get; set; }
        public string PostName { get; set; }
    }
}
