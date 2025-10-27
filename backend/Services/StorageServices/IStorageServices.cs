using backend.DTOs.MediaDtos;

namespace backend.Services.StorageServices;

public interface IStorageServices
{
    Task<string> SaveAsync(SaveMediaDto dto);
    Task<bool> DeleteAsync(string relativeUrl, CancellationToken ct);
    Task<int> DeletePrefixAsync(string folderPrefix, CancellationToken ct = default);
    Uri GetReadUri(string path, TimeSpan? ttl = null);
}
