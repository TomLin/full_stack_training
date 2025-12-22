using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Controllers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Add NorthwindContext for the Northwind database (DI 注入設定)
builder.Services.AddDbContext<NorthwindContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("Northwind"));
});

// 設定 CORS 原則 (允許來自 MVC 應用程式的請求), 但還沒有套用
string PolicyForMVC = "MVCwAjax";
builder.Services.AddCors(options => {
    options.AddPolicy(PolicyForMVC, policy => {
        // 允許所有標頭, 來源和方法(GET, POST, 等等)
        // policy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
        policy.AllowAnyHeader().WithOrigins("https://localhost:7115") // 只允許來自這個來源的請求，半公開服務
              .AllowAnyMethod();
    });

});


builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}


// app.UseCors(PolicyForMVC); // 全部的Controller 都套用這個 CORS 原則
app.UseCors(); // 先不設定預設的 CORS 原則，而是在各個 Endpoint 裡面設定
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapEmployeeEndpoints();

app.Run();
