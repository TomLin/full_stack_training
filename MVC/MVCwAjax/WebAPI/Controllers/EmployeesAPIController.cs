using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.DTO;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [EnableCors("MVCwAjax")]  // 套用在Program.cs 裡面設定的 CORS 原則
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesAPIController : ControllerBase
    {
        private readonly NorthwindContext _context;

        public EmployeesAPIController(NorthwindContext context)
        {
            _context = context;
        }

        // GET: api/EmployeesAPI
        [HttpGet]
        // 如果不需要ActionResult包装，可以直接返回IEnumerable<Employee>
        // 這樣做，可以簡化代碼，但是無法收到不同的HTTP狀態碼
        // 例如：404 Not Found, 500 Internal Server Error, 204 No Content等
        // ActionResult 提供了更靈活的控制, 可以根據不同情況返回不同的HTTP狀態碼
        public IEnumerable<EmployeeDTO> GetEmployees()
        {
            return _context.Employees.Select(e => new EmployeeDTO
            {
                EmployeeId = e.EmployeeId,
                LastName = e.LastName,
                FirstName = e.FirstName,
                Title = e.Title
            });
        }

        // GET: api/EmployeesAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDTO>> GetEmployee(int id)
        {   
            // 在下面的Select 會先回傳一個 IQueryable 的物件，一直到 FirstOrDefaultAsync
            // 才有 I/O 的動作，也才會需要用非同步的處理
            // 為了消除 warning 的squiggle 線，所以加上?，允許 null
            EmployeeDTO? employee = await _context.Employees.Select(e => new EmployeeDTO
                {
                    EmployeeId = e.EmployeeId,
                    LastName = e.LastName,
                    FirstName = e.FirstName,
                    Title = e.Title

                }).FirstOrDefaultAsync(e => e.EmployeeId == id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/EmployeesAPI/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ResultDTO> PutEmployee(int id, EmployeeDTO empDTO)
        {
            if (id != empDTO.EmployeeId)
            {
                return new ResultDTO
                {
                    Ok = false,
                    Code = 400 // Bad Request
                };
            }


            Employee? employee = await _context.Employees.FindAsync(id);

            if (employee != null)
            {
                employee.EmployeeId = empDTO.EmployeeId;
                employee.FirstName = empDTO.FirstName;
                employee.LastName = empDTO.LastName;
                employee.Title = empDTO.Title;

                _context.Entry(employee).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException) // 當兩個使用者同時修改同一筆資料時，會發生這個例外
                {

                    return new ResultDTO { Ok = false, Code = 500 }; // Code 500 代表伺服器錯誤

                }

                return new ResultDTO
                {
                    Ok = true,
                    Code = 204 // 成功
                };
            }
            else  
            {
                // return NoContent();  // 204 Status Code 修改成功，但不返回內容，前端不能確定，是否正確地更新了
                return new ResultDTO
                {
                    Ok = false,
                    Code = 404 // Not Found
                };
            }
        }

        // POST: api/EmployeesAPI
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ResultDTO>> PostEmployee(EmployeeDTO empDto)
        {
            // 將DTO 的資訊，寫入 Employee 的 model 的 schema
            Employee Emp = new Employee
            {   // EmployeeId 從 DTO 來的值，不會被放入資料庫(因為資料庫會自動increment EmployeeId 這個欄位，它存在只是因為要符合DTO schema
                // 因為資料庫有 Identity 遞增的設定，所以這從的假 EmployeeId 只能寫 0
                EmployeeId = empDto.EmployeeId, 
                FirstName = empDto.FirstName,
                LastName = empDto.LastName,
                Title = empDto.Title
            };
            
            // 寫回資料庫
            _context.Employees.Add(Emp);
            await _context.SaveChangesAsync();
            // 當資料存入資料庫後，連動的 Emp 物件，就會有資料庫提供的正確的 EmployeeId
            // empDto.EmployeeId = Emp.EmployeeId;
            return new ResultDTO { 
                Ok = true,
                Code = 204 // 成功
            };
        }

        // DELETE: api/EmployeesAPI/5
        [HttpDelete("{id}")]
        public async Task<ResultDTO> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return new ResultDTO { Ok = false, Code = 404 }; // 404 表示找不到資源
            }

            try
            {
                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();
                return new ResultDTO { Ok = true, Code = 204 };
            }
            catch (DbUpdateException) // 捕捉刪除失敗的例外
            {
                return new ResultDTO { Ok = false, Code = 500 }; // 500 代表伺服器錯誤
            }
        }

    }
}
