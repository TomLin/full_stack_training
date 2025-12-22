using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using MVCwAjax.Models;

namespace MVCwAjax.Controllers
{
    public class AjaxController : Controller
    {
        NorthwindContext _context;

        public AjaxController(NorthwindContext context)
        {
            _context = context;
        }

        //public IActionResult Index()
        //{
        //    return View();
        //}


        // GET: Ajax/Greet?Name=YourName&Key=YourValue&Key=YourValue (URL example)
        [HttpGet]
        public string Greet(string Name)
        {
            Thread.Sleep(4000); // 3秒，延遲，讓loading 的gif 檔可以顯示出來
            return $"RestApi Get: Hello {Name}, welcome MVC with Ajax!";
        }


        // Post: Ajax/PostGreet with body parameter Name=YourName
        [HttpPost]
        public string PostGreet(string Name)
        {
            Thread.Sleep(3000); // 3秒，延遲，讓loading 的gif 檔可以顯示出來
            return $"RestApi Post: Hello {Name}, welcome MVC with Ajax!";
        }

        // Post: Ajax/CheckName with body parameter FirstName=YourName
        [HttpPost]
        public string CheckName(string FirstName)
        {
            bool Exists = _context.Employees.Any(e => e.FirstName == FirstName);

            /*
            if (Exists)
            {
                return $"The name {FirstName} already exists in the database.";
            }
            else
            {
                return $"The name {FirstName} is available.";
            }
            */

            // 上方的簡寫法
            return Exists ? "true" : "false";

        }
    }
}
