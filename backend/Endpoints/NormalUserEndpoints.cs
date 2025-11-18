using System;
using backend.Data;
using backend.DTOs.BlogDtos;
using backend.DTOs.NormalUserDtos;
using backend.Services.NormalUserServices;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints;

public static class NormalUserEndpoints
{
    public static IEndpointRouteBuilder MapNormalUserEndPoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/user");

        //User signs-up for newsletter
        group.MapPost("/sign-up", async (
            NewsLetterSignUpDto dto,
            INormalUserService service,
            EntityContext db,
            IEmailSender email,
            ILoggerFactory loggerFactory,
            CancellationToken ct) =>
        {
            var logger = loggerFactory.CreateLogger("NewsletterSignup");
            // 1) Validate input
            if (dto == null || string.IsNullOrWhiteSpace(dto.Email))
                return Results.BadRequest("An email must be provided");

            // 2) Do your existing subscribe logic via your service
            //    Expected behavior (from your code): returns false if already subscribed.
            var subscribed = await service.SubscribedToNewsLetter(dto);
            if (!subscribed)
                return Results.BadRequest("Already applied to the news - letter");

            // 3) Fetch the (now) subscribed user so we can check/send the welcome email
            var user = await db.Users
                .FirstOrDefaultAsync(u => u.Email == dto.Email, ct);

            // Defensive: if for some reason we can't find the user, just succeed the request.
            if (user is null)
                return Results.Ok();

            // 4) Send welcome email only once
            if (!user.WelcomeEmailSent)
            {
                _ = Task.Run(async () =>
                {
                    try
                    {
                        const string subject = "Welcome to Aspiring Managers";
                        var html = """
                        <div style='font-family:sans-serif'>
                            <h2>Welcome to Aspiring Managers!</h2>
                            <p>Thanks for subscribing. You’ll get new posts and updates from us.</p>
                        </div>
                        """;

                        var ok = await email.SendAsync(user.Email, subject, html, CancellationToken.None);

                        if (ok)
                        {
                            user.WelcomeEmailSent = true;
                            await db.SaveChangesAsync();
                        }
                    }
                    catch (Exception ex)
                    {
                        logger.LogError(ex, "Failed to send newsletter welcome email to {Email}", user.Email);
                    }
                });
            }


            return Results.Ok();
        });

        //Get all blog summaries
        group.MapGet("/blogs", async (INormalUserService service, CancellationToken ct) =>
        {
            var blogs = await service.ReadBlogSummaries();
            return Results.Ok(blogs);
        });

        //Get a course
        group.MapGet("/courses/{id:int}", async (int id, ICourseService svc) =>
        {
            var dto = await svc.ReadCourse(id);
            return dto is null ? Results.NotFound() : Results.Ok(dto);
        });
        
        group.MapGet("/courses/latest", async (ICourseService svc) =>
        {
            var dto = await svc.ReadMostRecentCourse();

            if (dto is null)
            {
                // 200 OK with a friendly message, not 404
                return Results.Ok(new
                {
                    hasCourse = false,
                    message   = "Sorry, there is no course posted yet."
                });
            }

            return Results.Ok(new
            {
                hasCourse = true,
                course    = dto
            });
        });


        return group;

        
    }
}
