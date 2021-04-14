using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkersInfoConsolidation.Models;
using Microsoft.AspNetCore.Identity;

namespace WorkersInfoConsolidation.Services
{
    public interface IUserManager
    {
        Task<IdentityResult> CreateAsync(Worker user, string password);
        Task<Worker> FindByIdAsync(string id);
        Task<Worker> FindByEmailAsync(string email);
        Task<IdentityResult> UpdateAsync(Worker user);
        Task<IdentityResult> AddToRoleAsync(Worker user, string role);
        Task<IdentityResult> RemoveFromRoleAsync(Worker user, string role);
        Task<IList<string>> GetRolesAsync(Worker user);
        Task<bool> IsEmailConfirmedAsync(Worker user);
        Task<bool> CheckPasswordAsync(Worker user, string password);
        Task<IdentityResult> ChangePasswordAsync(Worker user, string currentPassword, string newPassword);
    }
}
