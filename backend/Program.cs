using System.Text;
using backend.Data;
using backend.DTOs.AuthDtos;
using backend.Endpoints;
using backend.Services.AdminServices;
using backend.Services.JwtTokenServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var jwtSection = builder.Configuration.GetSection("Jwt");
var jwtOptions = jwtSection.Get<JwtOptions>() ?? new JwtOptions();
jwtOptions = jwtOptions with { Key = builder.Configuration["Jwt:Key"] ?? "" };


builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = true;
        options.SaveToken = true;
        options.TokenValidationParameters = new()
        {
            ValidateIssuer = true,
            ValidIssuer = jwtOptions.Issuer,
            ValidateAudience = true,
            ValidAudience = jwtOptions.Audience,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Key)),
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromSeconds(30)
        };
    });

builder.Services.AddAuthorization(opts =>
{
    // Require role claim == admin
    opts.AddPolicy("AdminOnly", p => p.RequireRole("admin"));
});

//Read Connection String
var connString = builder.Configuration.GetConnectionString("Default");
//Register Entity Framework Core + MySQL
builder.Services.AddDbContext<EntityContext>(options => options.UseMySql(connString, ServerVersion.AutoDetect(connString)));
builder.Services.AddScoped<IAdminService, AdminServices>();
builder.Services.AddSingleton(jwtOptions);
builder.Services.AddSingleton<IJwtTokenService, JwtTokenService>();

var app = builder.Build();

app.MapAdminEndPoints();
app.MapAdminAuthEndpoints();

app.Run();
