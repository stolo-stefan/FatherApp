using backend.Data;
using backend.DTOs.MediaDtos;
using backend.Entities;
using backend.Services.StorageServices;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.MediaServices;

public class MediaService : IMediaService
{
    private readonly EntityContext _db;
    private readonly IStorageServices _storage;
    private readonly MediaOptions _opts;

    public MediaService(EntityContext db, IStorageServices storage, MediaOptions opts)
    {
        _db = db;
        _storage = storage;
        _opts = opts;
    }
    public async Task<bool> DeleteAsync(int blogId, int mediaId, CancellationToken ct = default)
    {
        var m = await _db.Medias.FirstOrDefaultAsync(x => x.Id == mediaId && x.BlogId == blogId, ct);
        if (m is null) return false;

        await _storage.DeleteAsync(m.Url, ct);
        _db.Medias.Remove(m);
        await _db.SaveChangesAsync(ct);
        return true;
    }

    public async Task<List<ReadMediaDto>> ListByBlogAsync(int blogId, CancellationToken ct = default)
    {
        var media = await _db.Medias
        .AsNoTracking()
        .Where(m => m.BlogId == blogId)
        .OrderBy(m => m.Id)
        .ToListAsync(ct);

        return media.Select(m =>
            new ReadMediaDto(
                m.Id,
                m.Url,                                // path-only stored in DB
                m.Kind,                               // enum
                _storage.GetReadUri(m.Url).ToString(),// SAS link for <img>/<video>
                m.OriginalFileName,
                m.ContentType,
                m.SizeBytes
            )
        ).ToList();
    }

    public async Task<IReadOnlyList<Media>> UploadAsync(int blogId, IFormFileCollection files, CancellationToken ct = default)
    {
        var blog = await _db.Blogs.FindAsync([blogId], ct);
        if (blog is null)
            throw new InvalidOperationException("Blog not found.");

        if (files.Count == 0)
            throw new InvalidOperationException("No files provided.");

        var saved = new List<Media>();

        foreach (var f in files)
        {
            ValidateFile(f);

            var isVideo = f.ContentType.StartsWith("video/");
            var kind = isVideo ? MediaKind.Video : MediaKind.Image;

            await using var stream = f.OpenReadStream();
            var url = await _storage.SaveAsync(new SaveMediaDto(
                FileStream: stream,
                FileName: f.FileName,
                ContentType: f.ContentType,
                Folder: $"blogs/{blogId}",
                ct: ct
            ));

            var m = new Media
            {
                BlogId = blogId,
                Url = url,
                OriginalFileName = f.FileName,
                SizeBytes = f.Length,
                ContentType = f.ContentType,
                StorageProvider = "AzureBlob",
                Kind = kind
            };

            saved.Add(m);
        }

        _db.Medias.AddRange(saved);
        await _db.SaveChangesAsync(ct);

        return saved;
    }

    private void ValidateFile(IFormFile f)
    {
        if (!_opts.AllowedContentTypes.Contains(f.ContentType))
            throw new InvalidOperationException($"Unsupported content type: {f.ContentType}");

        var isVideo = f.ContentType.StartsWith("video/");
        var cap = isVideo ? _opts.MaxVideoBytes : _opts.MaxImageBytes;

        if (f.Length > cap)
            throw new InvalidOperationException($"File too large. Max {(isVideo ? "video" : "image")} size is {cap} bytes.");
    }
}
