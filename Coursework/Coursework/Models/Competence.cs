using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coursework.Models
{
    public class Competence : IEntity<int>
    {
        public int Id { get; set; }
        public string CompetenceName { get; set; }
    }
}
