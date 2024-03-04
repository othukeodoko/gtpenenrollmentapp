using Microsoft.AspNetCore.Hosting;
using gtpenenrollmentapp.Server.Models;
using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Tools;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
var connectionstring = builder.Configuration.GetConnectionString("ApplicationDbContextConnection");
//Add DB Context
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionstring));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
