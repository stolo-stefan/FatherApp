using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using backend.DTOs.MediaDtos;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace backend.Services.StorageServices
{
    public sealed class FileSystemStorageServices : IStorageServices
    {
        private readonly string _rootPath;   // physical root, e.g. /data/media
        private const string MediaRequestPathPrefix = "/media"; // HTTP path prefix

        public FileSystemStorageServices(IConfiguration config, IWebHostEnvironment env)
        {
            _rootPath = config["Storage:RootPath"]
                        ?? Path.Combine(env.ContentRootPath, "media");

            Directory.CreateDirectory(_rootPath);
        }

        public async Task<string> SaveAsync(SaveMediaDto dto)
        {
            if (dto is null)
                throw new ArgumentNullException(nameof(dto));

            if (dto.FileStream is null)
                throw new InvalidOperationException("FileStream cannot be null.");

            // 1) Unique filename
            var ext = Path.GetExtension(dto.FileName);
            if (string.IsNullOrWhiteSpace(ext))
                ext = string.Empty;

            var uniqueName = $"{Guid.NewGuid():N}{ext}";

            // 2) Normalize logical folder: e.g. "blogs/5"
            var folder = (dto.Folder ?? string.Empty)
                .Trim()
                .Trim('/', '\\')
                .Replace('\\', '/');

            // 3) Disk relative path (no "/media" here, just internal structure)
            //    e.g. "blogs/5/abc123.png"
            var diskRelativePath = string.IsNullOrWhiteSpace(folder)
                ? uniqueName
                : $"{folder}/{uniqueName}";

            var physicalPath = Path.Combine(
                _rootPath,
                diskRelativePath.Replace('/', Path.DirectorySeparatorChar)
            );

            var directory = Path.GetDirectoryName(physicalPath);
            if (!string.IsNullOrWhiteSpace(directory))
                Directory.CreateDirectory(directory);

            // 4) Save to disk
            await using (var targetStream = new FileStream(
                             physicalPath,
                             FileMode.Create,
                             FileAccess.Write,
                             FileShare.None))
            {
                await dto.FileStream.CopyToAsync(targetStream, dto.ct);
            }

            // 5) Build the URL that the client will use
            //    e.g. "/media/blogs/5/abc123.png"
            var urlPath = $"{MediaRequestPathPrefix}/{diskRelativePath}"
                .Replace("//", "/");

            return urlPath; // store this in Media.Url
        }

        public Task<bool> DeleteAsync(string relativeUrl, CancellationToken ct)
        {
            if (string.IsNullOrWhiteSpace(relativeUrl))
                return Task.FromResult(false);

            // If it's an absolute URL (CDN), we can't delete it from local disk.
            if (relativeUrl.StartsWith("http", StringComparison.OrdinalIgnoreCase))
                return Task.FromResult(false);

            // Expect something like "/media/blogs/5/abc123.png"
            var path = relativeUrl.Trim();

            if (!path.StartsWith(MediaRequestPathPrefix, StringComparison.OrdinalIgnoreCase))
            {
                // Not our local media path
                return Task.FromResult(false);
            }

            // Strip "/media" prefix → "blogs/5/abc123.png"
            var diskRelative = path.Substring(MediaRequestPathPrefix.Length)
                                   .TrimStart('/', '\\')
                                   .Replace('\\', '/');

            var physicalPath = Path.Combine(
                _rootPath,
                diskRelative.Replace('/', Path.DirectorySeparatorChar)
            );

            if (!File.Exists(physicalPath))
                return Task.FromResult(false);

            File.Delete(physicalPath);
            return Task.FromResult(true);
        }

        public Task<int> DeletePrefixAsync(string folderPrefix, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(folderPrefix))
                return Task.FromResult(0);

            // folderPrefix should be logical like "blogs/5"
            var folder = folderPrefix
                .Trim('/', '\\')
                .Replace('\\', '/');

            var physicalFolder = Path.Combine(
                _rootPath,
                folder.Replace('/', Path.DirectorySeparatorChar)
            );

            if (!Directory.Exists(physicalFolder))
                return Task.FromResult(0);

            var files = Directory.GetFiles(physicalFolder, "*", SearchOption.AllDirectories);
            var deletedCount = 0;

            foreach (var file in files)
            {
                if (ct.IsCancellationRequested)
                    break;

                File.Delete(file);
                deletedCount++;
            }

            Directory.Delete(physicalFolder, recursive: true);

            return Task.FromResult(deletedCount);
        }

        public Uri GetReadUri(string path, TimeSpan? ttl = null)
        {
            if (string.IsNullOrWhiteSpace(path))
                throw new ArgumentException("Path cannot be empty.", nameof(path));

            // If it's already absolute, just return it.
            if (path.StartsWith("http", StringComparison.OrdinalIgnoreCase))
                return new Uri(path, UriKind.Absolute);

            // Ensure it starts with "/"
            var urlPath = path.StartsWith("/")
                ? path
                : "/" + path;

            // Relative to the origin (frontend will prefix with API_ORIGIN)
            return new Uri(urlPath, UriKind.Relative);
        }
    }
}
