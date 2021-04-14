using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using WorkersInfoConsolidation.Models;

namespace WorkersInfoConsolidation.Services
{
    public class ProxyUserManager : IUserManager
    {
        private readonly UserManager<Worker> _aspUserManager;

        public ProxyUserManager(UserManager<Worker> aspUserManager)
        {
            _aspUserManager = aspUserManager;
        }

        public Task<IdentityResult> CreateAsync(Worker user, string password)
        {
            return _aspUserManager.CreateAsync(user, password);
        }

        public Task<Worker> FindByIdAsync(string id)
        {
            return _aspUserManager.FindByIdAsync(id);
        }

        public Task<Worker> FindByEmailAsync(string email)
        {
            return _aspUserManager.FindByEmailAsync(email);
        }

        public Task<IdentityResult> UpdateAsync(Worker user)
        {
            return _aspUserManager.UpdateAsync(user);
        }

        public Task<IdentityResult> AddToRoleAsync(Worker user, string role)
        {
            return _aspUserManager.AddToRoleAsync(user, role);
        }

        public Task<IdentityResult> RemoveFromRoleAsync(Worker user, string role)
        {
            return _aspUserManager.RemoveFromRoleAsync(user, role);
        }

        public Task<IList<string>> GetRolesAsync(Worker user)
        {
            return _aspUserManager.GetRolesAsync(user);
        }

        public Task<bool> IsEmailConfirmedAsync(Worker user)
        {
            return _aspUserManager.IsEmailConfirmedAsync(user);
        }

        public Task<bool> CheckPasswordAsync(Worker user, string password)
        {
            return _aspUserManager.CheckPasswordAsync(user, password);
        }

        public Task<IdentityResult> ChangePasswordAsync(Worker user, string currentPassword, string newPassword)
        {
            return _aspUserManager.ChangePasswordAsync(user, currentPassword, newPassword);
        }
    }
}
