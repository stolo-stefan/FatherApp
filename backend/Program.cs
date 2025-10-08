using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//Read Connection String
var connString = builder.Configuration.GetConnectionString("Default");
//Register Entity Framework Core + MySQL
builder.Services.AddDbContext<EntityContext>(options => options.UseMySql(connString, ServerVersion.AutoDetect(connString)));

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
