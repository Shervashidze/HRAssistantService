using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace WorkersInfoConsolidation.Models
{
    public class WorkersDbContext : DbContext
    {
        public DbSet<Worker> Workers { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<StaffCategory> StaffCategories { get; set; }
        public DbSet<StaffType> StaffTypes { get; set; }
        public DbSet<Competence> Competences { get; set; }

        /*public WorkersDbContext()
        {
            Database.EnsureCreated();
        }*/

        public WorkersDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }
        
        /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql();
        }*/
    }
}