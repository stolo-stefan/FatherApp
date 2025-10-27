using backend.DTOs.MediaDtos;
using backend.Entities;

namespace backend.Services.MediaServices;

public interface IMediaService
{
    Task<IReadOnlyList<Media>> UploadAsync(int blogId, IFormFileCollection files, CancellationToken ct = default);
    Task<List<ReadMediaDto>> ListByBlogAsync(int blogId, CancellationToken ct = default);
    Task<bool> DeleteAsync(int blogId, int mediaId, CancellationToken ct = default);
}
