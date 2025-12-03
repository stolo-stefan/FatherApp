using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using backend.DTOs.MediaDtos;

namespace backend.Services.StorageServices
{
    /// <summary>
    /// Dummy implementation of IStorageServices.
    /// It does NOT actually save or delete any files.
    /// It just returns fake paths so the rest of the app can run
    /// without Azure / any real storage.
    /// </summary>
    public sealed class NullStorageServices : IStorageServices
    {
        public Task<string> SaveAsync(SaveMediaDto dto)
        {
            // We ignore dto.FileStream completely.
            // We just simulate a "path" that would have been saved.

            var ext = Path.GetExtension(dto.FileName);
            var unique = $"{Guid.NewGuid():N}{ext}";

            var folder = (dto.Folder ?? "")
                .Trim()
                .TrimStart('/', '\\')
                .TrimEnd('/', '\\')
                .Replace('\\', '/');

            var path = string.IsNullOrWhiteSpace(folder)
                ? unique
                : $"{folder}/{unique}";

            // This is what will be stored in DB instead of a real blob key.
            return Task.FromResult(path);
        }

        public Task<bool> DeleteAsync(string relativeUrl, CancellationToken ct)
        {
            // Pretend delete always succeeds
            return Task.FromResult(true);
        }

        public Task<int> DeletePrefixAsync(string folderPrefix, CancellationToken ct = default)
        {
            // Pretend nothing was deleted (or 0 items)
            return Task.FromResult(0);
        }

        public Uri GetReadUri(string path, TimeSpan? ttl = null)
        {
            // Just return the path as a relative-or-absolute URI.
            // Your frontend will get back exactly whatever was stored in DB.
            return new Uri(path ?? string.Empty, UriKind.RelativeOrAbsolute);
        }
    }
}
