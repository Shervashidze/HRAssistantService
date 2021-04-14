using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using WorkersInfoConsolidation.Models;

namespace WorkersInfoConsolidation
{
    public class RoleInitializer
    {
        public static async Task InitializeAsync(UserManager<Worker> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (await roleManager.FindByNameAsync("RN") == null)
            {
                await roleManager.CreateAsync(Roles.Roles.RN);
            }

            if (await roleManager.FindByNameAsync("admin") == null)
            {
                await roleManager.CreateAsync(Roles.Roles.Admin);
            }

            if (await roleManager.FindByNameAsync("worker") == null)
            {
                await roleManager.CreateAsync(Roles.Roles.Worker);
            }

            const string email = "admin@gmail.com";
            const string password = "Admin@1234";

            if (await userManager.FindByEmailAsync(email) == null)
            {
                var admin = new Worker
                {
                    Email = email,
                    UserName = "Admin"
                };

                var result = await userManager.CreateAsync(admin, password);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, Roles.Roles.Admin.Name); //TODO: dangerous
                    admin.EmailConfirmed = true;
                    await userManager.UpdateAsync(admin);
                }
            }
        }
    }
}

