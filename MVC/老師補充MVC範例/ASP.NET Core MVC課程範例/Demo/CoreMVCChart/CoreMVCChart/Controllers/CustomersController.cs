using CoreMVCChart.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace CoreMVCChart.Controllers
{
    public class CustomersController : Controller
    {
        NorthwindContext _context = null;
        public CustomersController(NorthwindContext context)
        {
            _context = context;
        }
        public IActionResult ChartJS()
        {
            var query = _context.Customers.GroupBy(c => c.Country).Select(g => new CustomerCount
            {
                Country = g.Key,
                Count = g.Count()
            });
            return View(query);
        }

        public async Task<JsonResult> GetCustomersCount()
        {
            var query = _context.Customers.GroupBy(c => c.Country).Select(g => new CustomerCount
            {
                Country = g.Key,
                Count = g.Count()
            });
            return Json(query);
        }

        public async Task<IActionResult> ECharts()
        {
            var query = _context.Customers.GroupBy(c => c.Country).Select(g => new CustomerCount
            {
                Country = g.Key,
                Count = g.Count()
            });
            var Options= $@"{{
                                xAxis: {{
                                    type: 'category',
                                    data: {JsonSerializer.Serialize(query.ToArray().Select(item=>item.Country))}
                                }},
                                yAxis: {{
                                    type: 'value'
                                }},
                                series: [
                                    {{
                                        data: {JsonSerializer.Serialize(query.ToArray().Select(item => item.Count))},
                                        type: 'bar'
                                    }}
                                ]
                          }}";
            ViewBag.Options = Options;
            return View(query);
        }

        public IActionResult PowerBI()
        {
            return View();
        }

    }
}
