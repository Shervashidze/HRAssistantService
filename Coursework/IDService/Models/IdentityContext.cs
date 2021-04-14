using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WorkersInfoConsolidation.Models
{
    public sealed class IdentityContext : IdentityDbContext<Worker>
    {
        public IdentityContext(DbContextOptions<IdentityContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
