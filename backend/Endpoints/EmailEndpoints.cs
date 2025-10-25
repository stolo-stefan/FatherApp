using backend.Data;
using backend.DTOs.NormalUserDtos;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

public static class EmailEndpoints
{
    public static IEndpointRouteBuilder MapEmailEndpoints(this IEndpointRouteBuilder app)
    {
        var emailGroup = app.MapGroup("/api/email").WithTags("Email");

        emailGroup.MapPost("/newsletter/subscribe", async (
            NewsLetterSignUpDto dto,
            EntityContext db,
            IEmailSender email,
        CancellationToken ct) =>
        {
            if (string.IsNullOrWhiteSpace(dto.Email))
                return Results.BadRequest("Email required.");

            var user = await db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email, ct);

            if (user is null)
            {
                user = new User
                {
                    Email = dto.Email,
                    IsNewsLetterSub = true,
                    WelcomeEmailSent = false
                };
                db.Users.Add(user);
                await db.SaveChangesAsync(ct);
            }
            else
            {
                if (user.IsNewsLetterSub) return Results.BadRequest("Already subscribed.");
                user.IsNewsLetterSub = true;
                await db.SaveChangesAsync(ct);
            }

            if (!user.WelcomeEmailSent)
            {
                var html = """
                <div style='font-family:sans-serif'>
                <h2>Welcome to Aspiring Managers!</h2>
                <p>Thanks for subscribing. You’ll get new posts and updates from us.</p>
                </div>
                """;

                var ok = await email.SendAsync(user.Email, "Welcome to Aspiring Managers", html, ct);
                if (ok)
                {
                    user.WelcomeEmailSent = true;
                    await db.SaveChangesAsync(ct);
                }
                else
                {
                    // keep WelcomeEmailSent=false so you could retry later if you want
                }
            }

            return Results.Ok();
        });

        return emailGroup;
    }
    
}