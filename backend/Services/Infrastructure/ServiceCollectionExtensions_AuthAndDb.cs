using System;
using System.Text;
using backend.Data;
using backend.DTOs.AuthDtos;
using backend.Services.JwtTokenServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services.Infrastructure;

public static class ServiceCollectionExtensions_AuthAndDb
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
    {
        // --- DbContext ---
        var cs = config.GetConnectionString("Default");
        services.AddDbContext<EntityContext>(opt => opt.UseMySql(cs!, ServerVersion.AutoDetect(cs)));

        // --- JWT Options ---
        var section = config.GetSection("Jwt");
        var jwt = section.Get<JwtOptions>() ?? new JwtOptions();
        jwt = jwt with { Key = config["Jwt:Key"] ?? "" };
        services.AddSingleton(jwt);

        // --- JWT Auth ---
        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(o =>
            {
                o.RequireHttpsMetadata = true;
                o.SaveToken = true;
                o.TokenValidationParameters = new()
                {
                    ValidateIssuer = true,
                    ValidIssuer = jwt.Issuer,
                    ValidateAudience = true,
                    ValidAudience = jwt.Audience,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key)),
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromSeconds(30)
                };
            });

        services.AddAuthorization(opts =>
        {
            opts.AddPolicy("AdminOnly", p => p.RequireRole("admin"));
        });

        // Token service
        services.AddSingleton<IJwtTokenService, JwtTokenService>();

        return services;
    }
}
