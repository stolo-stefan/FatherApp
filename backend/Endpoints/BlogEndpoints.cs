using System;
using System.Net;
using backend.Data;
using backend.DTOs.BlogDtos;
using backend.Entities;
using backend.Services.BlogServices;
using backend.Services.Email;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints;

public static class BlogEndpoints
{
    static string BuildNewPostHtml(Blog blog) => $@"
        <div style='font-family:sans-serif; line-height:1.5'>
        <h2>New blog: {WebUtility.HtmlEncode(blog.Title)}</h2>
        <p>{WebUtility.HtmlEncode(blog.Summary)}</p>
        <p>
            <a href=""https://aspiringmanagers.ro/blogs/{blog.Id}""
            style=""display:inline-block;padding:.6rem 1rem;background:#F57C00;color:#fff;border-radius:6px;text-decoration:none;"">
            Read the full article
            </a>
        </p>
        </div>";
    public static RouteGroupBuilder MapBlogEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/blogs");

        // Create blog
        group.MapPost("/", async (IEmailQueue queue, EntityContext db, IBlogService svc, CreateBlogDto dto, CancellationToken ct) =>
        {
            var res = await svc.CreateBlog(dto);
            if (!res.Success || res.Entity is null)
                return Results.BadRequest(res.Message);

            // Fetch newsletter recipients (page if needed later)
            var recipients = await db.Users
                .AsNoTracking()
                .Where(u => u.IsNewsLetterSub)
                .Select(u => u.Email)
                .ToListAsync(ct);

            if (recipients.Count > 0)
            {
                var html = BuildNewPostHtml(res.Entity);
                var subject = $"New post: {res.Entity.Title}";

                // Fan out via background queue so the HTTP request returns fast
                foreach (var to in recipients)
                {
                    queue.Enqueue(to, subject, html);
                }
            }

            return Results.Created($"/blogs/{res.Entity.Id}", res.Entity);
        }).RequireAuthorization("AdminOnly");

        // Get one (detailed, includes Media)
        group.MapGet("/detailed/{id:int}", async (IBlogService svc, int id) =>
        {
            var dto = await svc.ReadDetailedBlog(id);
            return dto is null ? Results.NotFound() : Results.Ok(dto);
        });

        group.MapGet("/summary/{id:int}", async (IBlogService svc, int id) =>
        {
            var dto = await svc.ReadSummaryBlog(id);
            return dto is null ? Results.NotFound() : Results.Ok(dto);
        });

        // List visible blogs (summaries)
        group.MapGet("/visible", async (IBlogService svc) =>
        {
            var list = await svc.ReadVisibleBlogs();
            return Results.Ok(list);
        });

        // List non-visible blogs (summaries)
        group.MapGet("/all", async (IBlogService svc) =>
        {
            var list = await svc.ReadAllBlogs();
            return Results.Ok(list);
        }).RequireAuthorization("AdminOnly");

        // Update blog (supports nullable fields for partial updates)
        group.MapPut("/{id:int}", async (IBlogService svc, int id, UpdateBlogDto dto) =>
        {
            var ok = await svc.UpdateBlog(id, dto);
            return ok ? Results.Ok("Updated.") : Results.NotFound();
        }).RequireAuthorization("AdminOnly");

        group.MapPut("/visible/{id:int}", async (IBlogService svc, int id) =>
        {
            var ok = await svc.UpdateBlogToVisible(id);
            if (!ok.Item1)
                return Results.NotFound("No blog with this id exists");
            if (!ok.Item2)
                return Results.BadRequest("Blog is already visible");
            return Results.Ok("Updated to visible");
        }).RequireAuthorization("AdminOnly");

        group.MapPut("/non-visible/{id:int}", async (IBlogService svc, int id) =>
        {
            var ok = await svc.UpdateBlogToNonVisible(id);
            if (!ok.Item1)
                return Results.NotFound("No blog with this id exists");
            if (!ok.Item2)
                return Results.BadRequest("Blog is already non-visible");
            return Results.Ok("Updated to non-visible");
        }).RequireAuthorization("AdminOnly");

        // Delete blog (cascade deletes Media)
        group.MapDelete("/{id:int}", async (IBlogService svc, int id) =>
        {
            var ok = await svc.DeleteBlog(id);
            return ok ? Results.NoContent() : Results.NotFound();
        }).RequireAuthorization("AdminOnly");

        return group;
    }
}