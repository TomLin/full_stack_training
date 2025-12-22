using Microsoft.AspNetCore.Mvc;

namespace CoreMvcArea.Areas.Accounting.Controllers
{
    [Area("Seller")]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Stock()
        {
            return View();
        }
        public IActionResult Unstock()
        {
            return View();
        }
    }
}
