using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CustomerLastOrder.Models;
using CustomerLastOrder.ViewModels;

namespace CustomerLastOrder.Controllers
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
            return View(_context.Customers.Select(c=>new CustomerVM { 
                CustomerId = c.CustomerId,
                CompanyName = c.CompanyName,
                LatestOrder= c.Orders.OrderByDescending(o => o.CustomerId == c.CustomerId).Select(o => new OrderVM
                {
                    OrderId = o.OrderId,
                    OrderDate = o.OrderDate
                }).FirstOrDefault(),
            }));
        }
        public IActionResult GetCustomersOrders()
        {            
            return View(_context.Customers.Select(c=>new CustomerOrdersVM { 
                CustomerId = c.CustomerId,
                CompanyName = c.CompanyName,
                Orders = c.Orders.Where(o=>o.CustomerId==c.CustomerId).ToArray()
            }));
        }
    }
}
