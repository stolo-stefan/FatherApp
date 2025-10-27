using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace backend.Services.StorageServices
{
    public sealed class AzureBlobFileStorage : IFileStorage
    {
        private readonly BlobContainerClient _container;

        public AzureBlobFileStorage(string connectionString, string containerName)
        {
            _container = new BlobContainerClient(connectionString, containerName);
            _container.CreateIfNotExists(PublicAccessType.None);
        }

        public async Task<StoredFile> SaveAsync(string fileName, Stream content, string contentType, CancellationToken ct = default)
        {
            var safeName = Path.GetFileName(fileName);
            var blob = _container.GetBlobClient(safeName);

            await blob.UploadAsync(content, new BlobUploadOptions
            {
                HttpHeaders = new BlobHttpHeaders { ContentType = contentType }
            }, ct);

            return new StoredFile(blob.Uri.ToString(), safeName, contentType);
        }

        public async Task<Stream> GetAsync(string key, CancellationToken ct = default)
        {
            var blob = _container.GetBlobClient(key);

            // Option A: named argument for the token
            var resp = await blob.DownloadStreamingAsync(cancellationToken: ct);

            // If you want the original content type, you can read:
            // var contentType = resp.Value.Details.ContentType;

            return resp.Value.Content;
        }

        public async Task<bool> DeleteAsync(string key, CancellationToken ct = default)
        {
            var resp = await _container.GetBlobClient(key)
                           .DeleteIfExistsAsync(DeleteSnapshotsOption.IncludeSnapshots, cancellationToken: ct);
            return resp.Value;
        }
    }
}
