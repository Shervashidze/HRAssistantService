using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkersInfoConsolidation.Models;

namespace WorkersInfoConsolidation.Services
{
    public interface ITokenService
    {
        Task<string> GetTokenAsync(Worker user);
    }
}
