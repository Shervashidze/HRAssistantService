using System.Threading.Tasks;
using WorkersInfoConsolidation.Models;
using WorkersInfoConsolidation.Models.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace WorkersInfoConsolidation.Services
{
    public interface IAccountService
    {
        Task<AccountData> GetAccountDataAsync(string userId);
        Task<IdentityResult> RegisterUserAsync(RegisterViewModel model);
        Task<IdentityResult> EditAccountAsync(string accountId, EditAccountViewModel model);
        Task<string> LoginUserAsync(LoginViewModel model);
    }
}
