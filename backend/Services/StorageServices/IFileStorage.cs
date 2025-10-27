namespace backend.Services.StorageServices
{
    public record StoredFile(string Url, string Key, string ContentType);

    public interface IFileStorage
    {
        Task<StoredFile> SaveAsync(string fileName, Stream content, string contentType, CancellationToken ct = default);
        Task<Stream> GetAsync(string key, CancellationToken ct = default);
        Task<bool> DeleteAsync(string key, CancellationToken ct = default);
    }
}