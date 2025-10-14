using System;
using backend.DTOs.BlogDtos;
using backend.Services.BlogServices;

namespace backend.Endpoints;

public static class BlogEndpoints
{
    public static RouteGroupBuilder MapBlogEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/blogs");

        // Create blog
        group.MapPost("/", (IBlogService svc, CreateBlogDto dto) =>
        {
            var res = svc.CreateBlog(dto);
            return res.Success
                ? Results.Created($"/blogs/{res.Entity!.Id}", res.Entity)
                : Results.BadRequest(res.Message);
        });

        // Get one (detailed, includes Media)
        group.MapGet("/{id:int}", (IBlogService svc, int id) =>
        {
            var blog = svc.ReadBlog(id);
            return blog is null ? Results.NotFound() : Results.Ok(blog);
        });

        // List visible blogs (summaries)
        group.MapGet("/visible", (IBlogService svc) =>
        {
            var list = svc.ReadVisibleBlogs();
            return Results.Ok(list);
        });

        // List non-visible blogs (summaries)
        group.MapGet("/non-visible", (IBlogService svc) =>
        {
            var list = svc.ReadAllBlogs();
            return Results.Ok(list);
        });

        // Update blog (supports nullable fields for partial updates)
        group.MapPut("/{id:int}", (IBlogService svc, int id, UpdateBlogDto dto) =>
        {
            var ok = svc.UpdateBlog(id, dto);
            return ok ? Results.Ok("Updated.") : Results.NotFound();
        });

        // Delete blog (cascade deletes Media)
        group.MapDelete("/{id:int}", (IBlogService svc, int id) =>
        {
            var ok = svc.DeleteBlog(id);
            return ok ? Results.NoContent() : Results.NotFound();
        });

        return group;
    }
}