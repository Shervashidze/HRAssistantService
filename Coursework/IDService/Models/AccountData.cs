using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkersInfoConsolidation.Models
{
    public class AccountData
    {
        public string UserName { get; }
        public string Email { get; }
        public string Role { get; }

        public AccountData(string userName, string email, string role)
        {
            UserName = userName;
            Email = email;
            Role = role;
        }
    }
}
