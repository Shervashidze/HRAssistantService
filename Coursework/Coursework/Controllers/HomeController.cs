using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coursework.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
            => View("Index");
    }
}
