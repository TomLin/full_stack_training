using CustomerWebsite.Models;
using CustomerWebsite.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace CustomerWebsite.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        NorthwindContext _context;

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

        public IActionResult Customers()
        {
            return View(_context.Customers); // Customers.cshtml

        }

        
        public IActionResult Contact()
        {
            return View();  // Contact.cshtml
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        // public IActionResult Contact(string Name, string Email, string Phone)
        public IActionResult Contact([Bind("Name, Email")] ContactViewModel cvm)
        {
            if (ModelState.IsValid)
            {
                // Process the valid ContactViewModel (e.g., save to database)
                ViewBag.Password = "12345";
                return RedirectToAction("Index", "Home");
            }

            // 如果驗證失敗，重新顯示表單並顯示錯誤訊息，讓使用者可以修正輸入
            return View(cvm);
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }


    
}
