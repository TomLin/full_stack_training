using Microsoft.AspNetCore.Mvc;
using Questionnaire.Models;
using System.Diagnostics;

namespace Questionnaire.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly NorthwindContext _context;

        public HomeController(ILogger<HomeController> logger, NorthwindContext context)
        {
            _logger = logger;
            _context = context;
        }

        


        public async Task<IActionResult> Index()
        {
            ViewBag.Fuen2025 = "Fuen 2025";
            Customer? c = await _context.Customers.FindAsync("ALFKI"); // ALFKI is the first record in Customers table
            ViewBag.ALFKI = c;
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}