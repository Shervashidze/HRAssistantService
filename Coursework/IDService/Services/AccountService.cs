using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkersInfoConsolidation.Models;
using WorkersInfoConsolidation.Models.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace WorkersInfoConsolidation.Services
{
    public class AccountService : IAccountService
    {
        private readonly IUserManager _userManager;
        private readonly SignInManager<Worker> _signInManager;
        private readonly ITokenService _tokenService;

        public AccountService(IUserManager userManager,
            SignInManager<Worker> signInManager,
            ITokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        public async Task<AccountData> GetAccountDataAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId).ConfigureAwait(false);
            if (user == null)
            {
                return null;
            }

            var userRoles = await _userManager.GetRolesAsync(user).ConfigureAwait(false);
            var userRole = userRoles.FirstOrDefault();
            return new AccountData(user.UserName, user.Email, userRole);
        }

        public async Task<IdentityResult> EditAccountAsync(string id, EditAccountViewModel model)
        {
            var user = await _userManager.FindByIdAsync(id).ConfigureAwait(false);
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError {Description = "User not found" });
            }

            if (!await _userManager.CheckPasswordAsync(user, model.CurrentPassword))
            {
                return IdentityResult.Failed(new IdentityError { Description = "Wrong password" });
            }

            var task = await ChangeUserNameTask(user, model);
            var secondTask = await ChangePasswordAsync(user, model).ConfigureAwait(false);
            return task;
        }

        public async Task<string> LoginUserAsync(LoginViewModel model)
        {
            if (await _userManager.FindByEmailAsync(model.Email).ConfigureAwait(false)
                    is var user && user == null)
            {
                return null;
            }

            if (!await _userManager.IsEmailConfirmedAsync(user).ConfigureAwait(false))
            {
                return null;
            }

            var result = await _signInManager.PasswordSignInAsync(
                user,
                model.Password,
                model.RememberMe,
                false).ConfigureAwait(false);

            if (!result.Succeeded)
            {
                return null;
            }

            var token = await _tokenService.GetTokenAsync(user).ConfigureAwait(false);
            return token;
        }

        //Todo register new user as admin
        public async Task<IdentityResult> RegisterUserAsync(RegisterViewModel model)
        {
            if (await _userManager.FindByEmailAsync(model.Email).ConfigureAwait(false) != null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "User alredy exists" });
            }

            var user = new Worker
            {
                UserName = model.Name,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, model.Role); //TODO: dangerous
                user.EmailConfirmed = true;
                await _userManager.UpdateAsync(user);
            }

            return IdentityResult.Success;
        }

        private Task<IdentityResult> ChangeUserNameTask(Worker user, EditAccountViewModel model)
        {
            return !string.IsNullOrWhiteSpace(model.UserName)
                ? _userManager.UpdateAsync(user)
                : Task.FromResult(IdentityResult.Success);
        }

        private Task<IdentityResult> ChangePasswordAsync(Worker user, EditAccountViewModel model)
        {
            return !string.IsNullOrWhiteSpace(model.NewPassword)
                ? _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword)
                : Task.FromResult(IdentityResult.Success);
        }
    }
}
