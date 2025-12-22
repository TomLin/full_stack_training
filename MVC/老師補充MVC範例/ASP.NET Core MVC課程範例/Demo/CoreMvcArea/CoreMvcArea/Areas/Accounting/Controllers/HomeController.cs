using Microsoft.AspNetCore.Mvc;

namespace CoreMvcArea.Areas.Accounting.Controllers
{
    [Area("Accounting")]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Menu1()
        {
            return View();
        }
        public IActionResult Menu2()
        {
            return View();
        }
    }
}
