using System;
using backend.DTOs.BlogDtos;
using backend.Services.BlogServices;

namespace backend.Endpoints;

public static class BlogEndpoints
{
    public static RouteGroupBuilder MapBlogEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/blogs").RequireAuthorization("AdminOnly");

        // Create blog
        group.MapPost("/", async (IBlogService svc, CreateBlogDto dto) =>
        {
            var res = await svc.CreateBlog(dto);
            return res.Success
                ? Results.Created($"/blogs/{res.Entity!.Id}", res.Entity)
                : Results.BadRequest(res.Message);
        });

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
        });

        // Update blog (supports nullable fields for partial updates)
        group.MapPut("/{id:int}", async (IBlogService svc, int id, UpdateBlogDto dto) =>
        {
            var ok = await svc.UpdateBlog(id, dto);
            return ok ? Results.Ok("Updated.") : Results.NotFound();
        });

        // Delete blog (cascade deletes Media)
        group.MapDelete("/{id:int}", async (IBlogService svc, int id) =>
        {
            var ok = await svc.DeleteBlog(id);
            return ok ? Results.NoContent() : Results.NotFound();
        });

        return group;
    }
}