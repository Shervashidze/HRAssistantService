using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WorkersInfoConsolidation.Models.ViewModels;
using WorkersInfoConsolidation.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using WorkersInfoConsolidation.Roles;

namespace WorkersInfoConsolidation.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet, Route("getUserData/{userId}")]
        public async Task<IActionResult> GetUserDataById(string userId)
        {
            var accountData = await _accountService.GetAccountDataAsync(userId).ConfigureAwait(false);

            return accountData != null
                ? Ok(accountData)
                : NotFound();
        }

        [HttpPost, Route("register")]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            var result = await _accountService.RegisterUserAsync(model).ConfigureAwait(false);
            return Ok(result);
        }

        [HttpPost, Route("login")]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            var tokenMeta = await _accountService.LoginUserAsync(model).ConfigureAwait(false);
            if (tokenMeta == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }
            return Ok(tokenMeta);
        }

        [HttpPut, Route("edit")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Edit(EditAccountViewModel model)
        {
            var result = await _accountService.EditAccountAsync(Request.GetUserId(), model).ConfigureAwait(false);
            return Ok(result);
        }

    }
}