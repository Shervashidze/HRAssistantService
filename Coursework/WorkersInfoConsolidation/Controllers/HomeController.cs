using Microsoft.AspNetCore.Mvc;
using WorkersInfoConsolidation.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkersInfoConsolidation.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
            => View("Index");
        
    }
}
