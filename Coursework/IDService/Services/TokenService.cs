using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkersInfoConsolidation;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WorkersInfoConsolidation.Roles;
using WorkersInfoConsolidation.Models;


namespace WorkersInfoConsolidation.Services
{
    public class TokenService : ITokenService
    {
        private readonly IUserManager _userManager;

        public TokenService(IUserManager userManager)
        {
            _userManager = userManager;
        }

        public async Task<string> GetTokenAsync(Worker user)
        {
            //var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("what a w0nderfull w0rld!"));
            var timeNow = DateTime.UtcNow;

            var userRoles = await _userManager.GetRolesAsync(user).ConfigureAwait(false);

            var token = new JwtSecurityToken(
                issuer: "WorkersInfoConsolidation",
                notBefore: timeNow,
                expires: timeNow.AddMinutes(120),
                claims: new[]
                {
                    new Claim("_userName", user.UserName),
                    new Claim("_id", user.Id),
                    new Claim("_email", user.Email),
                    new Claim("_role", userRoles.FirstOrDefault() ?? Roles.Roles.Worker.Name)
                });
                //signingCredentials: new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256));

            //var tokenCredentials = new TokenCredentials
            //{
            //    AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
            //    ExpiresIn = (int)TimeSpan.FromMinutes(_appSettings.ExpireInForResponse).TotalSeconds
            //};

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
