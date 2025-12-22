using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using WebAPI.Models;
namespace WebAPI.Controllers;

public static class EmployeeEndpoints
{
    public static void MapEmployeeEndpoints (this IEndpointRouteBuilder routes)
    {
        // 下面的 baseAddress 是 /api/Employee
        // 所以 / 代表 /api/Employee/
        // /api/Employee/{id} 代表取得特定 ID 的員工資料
        var group = routes.MapGroup("/api/Employee").WithTags(nameof(Employee));

        group.MapGet("/", () =>
        {
            return new [] { new Employee() };
        })
        .WithName("GetAllEmployees")
        .WithOpenApi();

        group.MapGet("/{id}", (int id) =>
        {
            //return new Employee { ID = id };
        })
        .WithName("GetEmployeeById")
        .WithOpenApi();

        group.MapPut("/{id}", (int id, Employee input) =>
        {
            return TypedResults.NoContent();
        })
        .WithName("UpdateEmployee")
        .WithOpenApi();

        group.MapPost("/", (Employee model) =>
        {
            //return TypedResults.Created($"/api/Employees/{model.ID}", model);
        })
        .WithName("CreateEmployee")
        .WithOpenApi();

        group.MapDelete("/{id}", (int id) =>
        {
            //return TypedResults.Ok(new Employee { ID = id });
        })
        .WithName("DeleteEmployee")
        .WithOpenApi();
    }
}
