using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LearningEvents.Models;
using Microsoft.EntityFrameworkCore;

namespace LearningEvents.Models
{
    public class LearningServiceContext : DbContext
    {
        public DbSet<LearningEvent> LearningEvents { get; set; }
        public DbSet<Worker> Workers { get; set; }
        public DbSet<Competence> Competence { get; set; }

        public LearningServiceContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}