using System.Security.Claims;
using backend.Data;
using backend.DTOs.AuthDtos;
using backend.Services.JwtTokenServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints;

public static class AuthEndpoints
{
    public static IEndpointRouteBuilder MapAdminAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var auth = app.MapGroup("/api/admin/auth").WithTags("AdminAuth");

        // LOGIN (no auth)
        auth.MapPost("/login", async (LogInRequestDto req, EntityContext db, IJwtTokenService jwt) =>
        {
            if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
                return Results.BadRequest(new { message = "Email and Password are required." });

            var normalized = req.Email.Trim().ToLowerInvariant();

            var user = await db.Users.AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email.ToLower() == normalized && u.Role.ToLower() == "admin");

            if (user is null)
                return Results.Unauthorized(); // wrong email or not admin

            // verify password (BCrypt)
            if (!BCrypt.Net.BCrypt.Verify(req.Password, user.AdminPassword))
                return Results.Unauthorized();

            var (token, expiresAt) = jwt.CreateToken(user, DateTime.UtcNow);
            return Results.Ok(new LogInResponseDto(token, expiresAt ));
        });

        // LOGOUT (authenticated) — client-side: just drop the token.
        auth.MapPost("/logout", [Authorize(Policy = "AdminOnly")] (ClaimsPrincipal userPrincipal) =>
        {
            // stateless JWT: server cannot “destroy” the token — client must forget it.
            // If you add revocation, capture JTI here and store it as revoked.
            return Results.NoContent();
        });

        // Optionally, a "whoami" for debugging
        auth.MapGet("/me", [Authorize(Policy = "AdminOnly")] (ClaimsPrincipal userPrincipal) =>
        {
            var id = userPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            var email = userPrincipal.FindFirstValue(ClaimTypes.Email) 
                        ?? userPrincipal.FindFirstValue("email"); // depending on claim mapping
            var role = userPrincipal.FindFirstValue(ClaimTypes.Role);
            return Results.Ok(new { id, email, role });
        });

        return auth;
    }
}
