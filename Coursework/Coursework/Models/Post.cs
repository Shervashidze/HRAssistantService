using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coursework.Models
{
    public class Post : IEntity<int>
    {
        public int Id { get; set; }
        public int PostName { get; set; }
    }
}
