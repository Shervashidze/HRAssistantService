using Microsoft.AspNetCore.Identity;

namespace WorkersInfoConsolidation.Roles
{
    public static class Roles
    {
        public static IdentityRole RN = new IdentityRole("RN");
        public static IdentityRole Worker = new IdentityRole("Worker");
        public static IdentityRole Admin = new IdentityRole("Admin");
    }
}
