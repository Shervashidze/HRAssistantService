using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace WorkersInfoConsolidation.Models
{
    public class WorkersDbContext : DbContext
    {
        public DbSet<Worker> Workers { get; set; }

        public WorkersDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }
        
    }
}