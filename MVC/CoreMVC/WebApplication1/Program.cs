/*
program.cs -> 程式入口，通常的結構如下

1. Create builder
2. Register services
    這裡就是在註冊 Dependency Injection (DI) Container 裡面的服務    

    builder.Services.AddControllersWithViews();
    builder.Services.AddDbContext<MyDb>();
    builder.Services.AddAuthentication();
    builder.Services.AddAuthorization();
    服務包括：MVC 控制器, Razor 檢視, 資料庫 DbContext, 身分驗證 / 授權
    Logging, Sessions, HttpClient ...等等
3.  Configure middleware (pipeline)
    app.UseRouting();
    app.UseAuthorization();
4. Map routes and start server
    app.MapControllerRoute(...);
    app.Run();

 */




using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}




/*
 當使用者 訪問 index.html 時, 通常經過一連串的 request pipeline:
    → UseExceptionHandler（處理錯誤）
    → UseHttpsRedirection（切換成 HTTPS）
    → UseStaticFiles（如果是圖片/JS/CSS 就在這裡結束）
    → UseRouting（匹配路由）
    → UseAuthentication（驗證登入）
    → UseAuthorization（檢查權限）
    → UseEndpoints（執行 Controller Action）
 */



// http request pipeline
app.UseHttpsRedirection();  // 將 HTTP 請求重新導向到 HTTPS
app.UseRouting();  // 將 request 引導到對應的 endpoint (controller/action)

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

app.MapRazorPages()
   .WithStaticAssets();

app.Run();
