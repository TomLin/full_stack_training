using CoreMVCCustomerOrders.Models;
using CoreMVCCustomerOrders.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CoreMVCCustomerOrders.Controllers
{
    public class CustomersController : Controller
    {
        NorthwindContext _context;
        public CustomersController(NorthwindContext context) 
        {
            _context = context;
        }
        public IActionResult Index()
        {
            ViewBag.Customers = new SelectList(_context.Customers.Select(c=>new { 
                CustomerId = c.CustomerId,
                CompanyName=c.CompanyName,
            }), "CustomerId", "CompanyName");
            return View();
        }

        public IActionResult IndexDataTables()
        {
            ViewBag.Customers = new SelectList(_context.Customers.Select(c=>new { 
                CustomerId = c.CustomerId,
                CompanyName=c.CompanyName,
            }).OrderBy(c=>c.CompanyName), "CustomerId", "CompanyName");
            return View();
        }

        public async Task<IActionResult> Orders(string id)
        {
            Customer c = await _context.Customers.FindAsync(id);
            return PartialView("_OrdersPartial", c.Orders);
        }

        public async Task<JsonResult> OrdersDataTable(string id)
        {
            Customer c = await _context.Customers.FindAsync(id);
            var ovm = c.Orders.Select(o => new OrderViewModel { 
                OrderId= o.OrderId,
                CustomerId= o.CustomerId,
                EmployeeId=o.EmployeeId,
                OrderDate=o.OrderDate,
                RequiredDate=o.RequiredDate,
                ShippedDate=o.ShippedDate,
                ShipVia=o.ShipVia,
                Freight=o.Freight,
                ShipName=o.ShipName,
                ShipAddress=o.ShipAddress,
                ShipCity=o.ShipCity,
                ShipRegion=o.ShipRegion,
                ShipPostalCode=o.ShipPostalCode,
                ShipCountry=o.ShipCountry,
            });
            return Json(ovm);
        }

    }
}
