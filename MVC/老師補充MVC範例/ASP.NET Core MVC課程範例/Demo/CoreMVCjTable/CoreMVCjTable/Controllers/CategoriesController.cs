using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CoreMVCjTable.Models;
using System.Linq.Dynamic.Core;

namespace CoreMVCjTable.Controllers
{
    public class CategoriesController : Controller
    {
        private readonly NorthwindContext _context;

        public CategoriesController(NorthwindContext context)
        {
            _context = context;
        }

        // GET: Categories
        public IActionResult Index()
        {
            ViewBag.CategoryName = new SelectList(_context.Categories.Select(c => c.CategoryName).Distinct());
            return View();
        }

        [HttpPost]
        public JsonResult List(string CategoryName = "", int jtStartIndex = 0, int jtPageSize = 5, string jtSorting = null)
        {
            string[] OrderByCondition = jtSorting.Split(new char[] { ' ' });
            string SortDirection = OrderByCondition[1].Equals("ASC") ? "Ascending" : "Descending";
            string Ordering = $"{OrderByCondition[0]} {SortDirection}";
            var query = _context.Categories.AsQueryable<Category>();
            if (CategoryName != "--商品種類篩選--")
            {
                query = query.Where(c => c.CategoryName == CategoryName).AsQueryable<Category>();
            }
            var RecordSet = query.OrderBy(Ordering).Skip(jtStartIndex).Take(jtPageSize);
            var result = Json(new { Result = "OK", Records = RecordSet, TotalRecordCount = query.Count() });
            return result;
        }

        // POST: Categories/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Create([Bind("CategoryId,CategoryName,Description,Picture")] Category category)
        {
            if (ModelState.IsValid)
            {
                _context.Add(category);
                await _context.SaveChangesAsync();
                return Json(new { Result = "OK", Record = category });
            }
            else
            {
                return Json(new
                {
                    Result = "Error",
                    Message = "新增記錄失敗!"
                });
            }
        }

        // POST: Categories/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update([Bind("CategoryId,CategoryName,Description,Picture")] Category category)
        {
            if (ModelState.IsValid)
            {
                Category c = await _context.Categories.FindAsync(category.CategoryId);
                c.CategoryName = category.CategoryName;
                c.Description = category.Description;
                try
                {
                    _context.Update(c);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CategoryExists(category.CategoryId))
                    {
                        return Json(new { Result = "Error", Message = "記錄不存在!" });
                    }
                    else
                    {
                        throw;
                    }
                }
                return Json(new { Result = "OK", Record = category });
            }
            else
            {
                return Json(new
                {
                    Result = "Error",
                    Message = "修改記錄失敗!"
                });
            }
        }

        // POST: Categories/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int CategoryId)
        {
            var category = await _context.Categories.FindAsync(CategoryId);
            if (category == null)
            {
                return Json(new
                {
                    Result = "Error",
                    Message = "找不到欲刪除的記錄!"
                });
            }
            else
            {
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
                return Json(new { Result = "OK", Record = category });
            }
        }

        [HttpPost]
        public JsonResult GetProducts(int id)
        {
            var Product = from p in _context.Products
                          where p.CategoryId == id
                          select new
                          {
                              ProductName = p.ProductName,
                              CategoryId = p.CategoryId,
                              SupplierId = p.SupplierId,
                              QuantityPerUnit = p.QuantityPerUnit,
                              UnitPrice = p.UnitPrice,
                              UnitsInStock = p.UnitsInStock,
                              UnitsOnOrder = p.UnitsOnOrder,
                              Discontinued = p.Discontinued
                          };
            return Json(new { Result = "OK", Records = Product });
        }

        public async Task<FileResult> GetPicture(int id)
        {
            Category category = await _context.Categories.FindAsync(id);
            byte[] content = category.Picture;
            if (content == null)
            {
                return File("~/images/NoImage.png", "image/png");
            }
            else
            {
                return File(content, "image/jpeg");
            }
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.CategoryId == id);
        }
    }
}
