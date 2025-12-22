using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using MVCwAjax.Models;
using System.Diagnostics;
using System.Text.Json;
using System.Linq;
using static System.Net.WebRequestMethods;

namespace MVCwAjax.Controllers
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

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        // GET: Home/jQueryAjax
        [HttpGet]
        public IActionResult jQueryAjax()
        {
            return View();
        }

        // GET: Home/CheckName
        [HttpGet]
        public IActionResult CheckName()
        {
            return View();
        }


        // GET: Home/ExRates
        [HttpGet]
        public IActionResult ExRates()
        {
            return View("ExRates"); // ExRates.cshtml
        }

        [HttpGet]
        public IActionResult WebAPI()
        {
            return View("Employees");
        }

        // POST: Home/GetRates
        [HttpPost]
        public async Task<string> GetRates()

        {
            // Create an instance of HttpClient to send HTTP requests
            HttpClient client = new HttpClient();
            HttpResponseMessage Response = await client.GetAsync("https://openapi.taifex.com.tw/v1/DailyForeignExchangeRates");
            // EnsureSuccessStatusCode throws an exception if the status code is not successful  
            // if the response indicates success (status code 200-299), the method completes normally.
            // if the response indicates failure (status code outside 200-299), it throws an HttpRequestException.
            Response.EnsureSuccessStatusCode();

            string jsonString = await Response.Content.ReadAsStringAsync(); // Return the response content as a string

            Rates[]? rates = JsonSerializer.Deserialize<Rates[]>(jsonString);

            client.Dispose(); // Release the resources used by HttpClient

            // ?. 如果 rates 為 null，則不會呼叫 LastOrDefault() 方法，整個表達式的結果將是 null。
            // ?.USDNTD  如果 LastOrDefault() 返回的物件為 null，則不會嘗試存取 USDNTD 屬性，整個表達式的結果將是 null, 以此類推
            // ?? 如果前面的表達式結果為 null，則會返回 "0" 作為預設值。
            return rates?.LastOrDefault()?.USDNTD ?? "0"; // Return the USD to NTD exchange rate of the latest date

        }
    }
}
