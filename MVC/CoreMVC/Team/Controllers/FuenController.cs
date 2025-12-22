using Microsoft.AspNetCore.Mvc;

namespace Team.Controllers
{
    public class FuenController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
