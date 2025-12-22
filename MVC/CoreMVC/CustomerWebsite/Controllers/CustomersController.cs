using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CustomerWebsite.Models;

namespace CustomerWebsite.Controllers

{
    // 下面 atttribute 的寫法，表示在 Customers Controller 之後
    // 可以接 action 名稱 (預設是 Index)，然後可選擇性地接 CustomerId 參數
    [Route("/Customers/{action=Index}/{CustomerId?}")]
    public class CustomersController : Controller
    {
        private readonly NorthwindContext _context;

        public CustomersController(NorthwindContext context)
        {
            _context = context;
        }

        // GET: Customers
        // → 預設是 GET 請求 Customers/Index
        // 指索取所有客戶資料
        [HttpGet]
        public IActionResult Index()
        {
            return View(_context.Customers);
        }

        // GET: Customers/Details/5
        // → 預設是 GET 請求 Customers/Details/5, 5 是 CustomerId
        // 指索取單一客戶資料
        [HttpGet]
        public async Task<IActionResult> Details(string CustomerId)
        {
            if (CustomerId == null)
            {
                return NotFound();  // 404
            }

            var customer = await _context.Customers
                .FirstOrDefaultAsync(m => m.CustomerId == CustomerId);
            if (customer == null)
            {
                return NotFound();  // 404
            }

            return View(customer);
        }

        // GET: Customers/Create
        [HttpGet]
        public IActionResult Create()
        {
            return View();  // 會產生 Create.cshtml 這一個 View
        }

        // POST: Customers/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("CustomerId,CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax")] Customer customer)
        {
            if (ModelState.IsValid)
            {
                _context.Add(customer);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));  // create a new customer之後，重新導向到 Index 動作方法
            }
            return View(customer);
        }

        // GET: Customers/Edit/5
        [HttpGet]
        public async Task<IActionResult> Edit(string CustomerId)
        {
            if (CustomerId == null)
            {
                return NotFound();
            }

            var customer = await _context.Customers.FindAsync(CustomerId);
            if (customer == null)
            {
                return NotFound();
            }
            return View(customer);
        }

        // POST: Customers/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, [Bind("CustomerId,CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax")] Customer customer)
        {
            if (id != customer.CustomerId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)  // 看 Server 端的驗證是否通過
            {
                try
                {
                    _context.Update(customer);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CustomerExists(customer.CustomerId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(customer);
        }

        // GET: Customers/Delete/5
        [HttpGet]
        public async Task<IActionResult> Delete(string CustomerId)
        {
            if (CustomerId == null)
            {
                return NotFound();
            }

            var customer = await _context.Customers
                .FirstOrDefaultAsync(m => m.CustomerId == CustomerId);
            if (customer == null)
            {
                return NotFound();
            }

            return View(customer);
        }

        // POST: Customers/Delete/5
        // 在 URL 當中的寫法是 /Controller/Action/
        // 因為 Delete 動作方法有兩個，為了避免衝突，所以用 ActionName 特性來指定路由名稱
        // 這樣就可以讓這個動作方法對應到 /Customers/Delete/5 的路由
        // 如果沒有這個attribute，預設會對應到 /Customers/DeleteConfirmed/5 的路由
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string CustomerId)
        {
            var customer = await _context.Customers.FindAsync(CustomerId);
            if (customer != null)
            {
                _context.Customers.Remove(customer);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CustomerExists(string CustomerId)
        {
            return _context.Customers.Any(e => e.CustomerId == CustomerId);
        }
    }
}
