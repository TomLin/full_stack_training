using CoreMVCValidation.Models;
using CoreMVCValidation.ViewModels;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text.RegularExpressions;

namespace CoreMVCValidation.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Contact()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Contact([Bind("Name,Email,Phone")]ContactsViewModel contacts)
        {
            string RejectEmail = @"^([\w.-]+)@(\[(\d{1,3}\.){3}|(?!hotmail|gmail|yahoo)(([a-zA-Z\d-]+\.)+))([a-zA-Z]{2,4}|\d{1,3})(\]?)$";
            if (!string.IsNullOrEmpty(contacts.Name) && !string.IsNullOrEmpty(contacts.Email))
            {
                if (!Regex.IsMatch(contacts.Email, RejectEmail))
                {
                    ModelState.AddModelError("Email", "不可以使用Gmail, Hotmail, Yahoo電子郵件!");
                }
            }
            if (ModelState.IsValid)
            {
                //寫入資料庫
                return RedirectToAction(nameof(Index));
            }
            return View(contacts);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            IExceptionHandlerPathFeature? exceptionFeature = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
            if (exceptionFeature != null)
            {
                string ErrorPath = exceptionFeature.Path;
                Exception ex = exceptionFeature.Error;
                _logger.LogError($"{ex.Message}發生在{ErrorPath}");
            }
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}