using backend.DTOs.MediaDtos;

namespace backend.Services.StorageServices;

public class StorageService : IStorageServices
{
    private readonly IWebHostEnvironment _env;

    public StorageService(IWebHostEnvironment env)
    {
        _env = env;
    }
    public Task<bool> DeleteAsync(string relativeUrl, CancellationToken ct)
    {
        try
        {
            var webRoot = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");

            // Accept absolute or relative; we only need the path part under wwwroot
            var isAbs = Uri.TryCreate(relativeUrl, UriKind.Absolute, out var absUri);
            var pathPart = isAbs ? absUri!.AbsolutePath : relativeUrl;

            var local = pathPart.TrimStart('/').Replace("/", Path.DirectorySeparatorChar.ToString());
            var fullPath = Path.Combine(webRoot, local);

            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
            }
            return Task.FromResult(true);
        }
        catch
        {
            return Task.FromResult(false);
        }
    }

    public async Task<string> SaveAsync(SaveMediaDto dto)
    {
        var webRoot = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");

        // uploads/<folder>  (e.g., uploads/blogs/5)
        var safeFolder = dto.Folder.Replace("..", string.Empty).Trim('/');
        var uploadsRoot = Path.Combine(webRoot, "uploads", safeFolder);
        Directory.CreateDirectory(uploadsRoot);

        // Unique name: <guid><ext>
        var ext = Path.GetExtension(dto.FileName);
        var unique = $"{Guid.NewGuid():N}{ext}";
        var fullPath = Path.Combine(uploadsRoot, unique);

        // Write stream to disk
        await using (var fs = new FileStream(fullPath, FileMode.CreateNew, FileAccess.Write, FileShare.None, 81920, useAsync: true))
        {
            await dto.FileStream.CopyToAsync(fs, dto.ct);
        }

        // Return a URL relative to web root (served by UseStaticFiles)
        // => /uploads/<folder>/<file>
        var relativeUrl = $"/uploads/{safeFolder}/{unique}".Replace("\\", "/");
        return relativeUrl;
    }
}
