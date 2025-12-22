using MasterDetailsEntryForm.Models;
using MasterDetailsEntryForm.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace MasterDetailsEntryForm.Controllers
{
    public class OrdersController : Controller
    {
        private NorthwindContext _context;

        public OrdersController(NorthwindContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            ViewBag.CustomerId = new SelectList(_context.Orders.Select(o => o.CustomerId).Distinct());
            return View();
        }

        //POST : /Orders/SaveOrder
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<JsonResult> SaveOrder([FromBody]OrderVM O)
        {
            bool status = false;
            if (ModelState.IsValid)
            {
                Order order = new Order { OrderId = 0, CustomerId=O.CustomerId, RequiredDate = O.RequiredDate };
                _context.Orders.Add(order);
                await _context.SaveChangesAsync();
                foreach (var odvm in O.OrderDetails)
                {
                        OrderDetail od = new OrderDetail
                        {
                            OrderId = order.OrderId,
                            ProductId = odvm.ProductId,
                            UnitPrice = odvm.UnitPrice,
                            Quantity = odvm.Quantity,
                            Discount = odvm.Discount,
                        };
                        _context.OrderDetails.Add(od);
                }
                await _context.SaveChangesAsync();
                status = true;
            }
            else
            {
                status = false;
            }
            return Json( new { status = status } );
        }
    }
}
