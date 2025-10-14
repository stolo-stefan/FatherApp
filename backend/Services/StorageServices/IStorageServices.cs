using backend.DTOs.MediaDtos;

namespace backend.Services.StorageServices;

public interface IStorageServices
{
    Task<string> SaveAsync(SaveMediaDto dto);
    Task<bool> DeleteAsync(string relativeUrl, CancellationToken ct);
}
