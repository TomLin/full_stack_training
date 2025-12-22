using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ViewTwoSelectOption.Models;

namespace ViewTwoSelectOption.Controllers
{
    public class CustomersController : Controller
    {
        private readonly NorthwindContext _context;

        public CustomersController(NorthwindContext context)
        {
            _context = context;
        }

        // GET: Customers
        public IActionResult Index()
        {
            ViewBag.Customers = new SelectList(_context.Customers, "CustomerId", "CompanyName");
            return View();
        }

        public IActionResult Orders(string id)
        {
            ViewBag.Orders = new SelectList(_context.Orders.Where(o=>o.CustomerId==id), "OrderId", "OrderId");
            return PartialView("_OrdersPartial");
        }

        public IActionResult OrderDetails(string id)
        {            
            return PartialView("_OrderDetailsPartial", _context.OrderDetails.Where(od => Convert.ToString(od.OrderId) == id));
        }
    }
}
