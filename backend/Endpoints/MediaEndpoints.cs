using System;
using backend.DTOs.MediaDtos;
using backend.Services.MediaServices;

namespace backend.Endpoints;

public static class MediaEndpoints
{
        public static RouteGroupBuilder MapMediaEndpoints(this IEndpointRouteBuilder routes)
    {
        // Group: /blogs/{blogId}/media
        var group = routes.MapGroup("/api/blogs/{blogId:int}/media");

        // Upload one or multiple files to a blog
        group.MapPost("/", async (int blogId, HttpRequest req, IMediaService mediaSvc, CancellationToken ct) =>
        {
            if (!req.HasFormContentType)
                return Results.BadRequest("multipart/form-data required.");

            var form = await req.ReadFormAsync(ct);
            if (form.Files.Count == 0)
                return Results.BadRequest("No files provided.");

            try
            {
                var saved = await mediaSvc.UploadAsync(blogId, form.Files, ct);
                var dto = saved.Select(m => new ReadMediaDto(
                    m.Id, m.BlogId, m.Url, m.OriginalFileName, m.SizeBytes,
                    m.ContentType, m.StorageProvider, m.Kind
                )).ToList();

                return Results.Created($"/blogs/{blogId}/media", dto);
            }
            catch (InvalidOperationException ex)
            {
                return Results.BadRequest(ex.Message);
            }
        })
        .Accepts<IFormFile>("multipart/form-data");

        // List all media for a blog
        group.MapGet("/", async (int blogId, IMediaService mediaSvc, CancellationToken ct) =>
        {
            var list = await mediaSvc.ListByBlogAsync(blogId, ct);
            return Results.Ok(list);
        });

        // Delete a specific media item (also removes file from storage)
        group.MapDelete("/{mediaId:int}", async (int blogId, int mediaId, IMediaService mediaSvc, CancellationToken ct) =>
        {
            var ok = await mediaSvc.DeleteAsync(blogId, mediaId, ct);
            return ok ? Results.NoContent() : Results.NotFound();
        });

        return group;
    }
}
