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
        public DbSet<Feedback> Feedbacks { get; set; }

        public LearningServiceContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Feedback>().ToTable("Feedbacks");
            modelBuilder.Entity<Feedback>().HasKey(s => new { s.EventId, s.WorkerId });
        }
    }
}