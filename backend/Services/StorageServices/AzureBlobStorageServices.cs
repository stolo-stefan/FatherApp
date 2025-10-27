using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Azure;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;
using backend.DTOs.MediaDtos;
using backend.Services.StorageServices;

public sealed class AzureBlobStorageServices : IStorageServices
{
    private readonly BlobContainerClient _container;
    private readonly bool _useSasLinks;
    private readonly TimeSpan _sasTtl;

    // single ctor; default to SAS links ON
    public AzureBlobStorageServices(
        string connectionString,
        string containerName,
        bool useSasLinks = true,
        TimeSpan? sasTtl = null)
    {
        _container = new BlobContainerClient(connectionString, containerName);
        _container.CreateIfNotExists(PublicAccessType.None); // private
        _useSasLinks = useSasLinks;
        _sasTtl = sasTtl ?? TimeSpan.FromHours(6);
    }

    // Store ONLY the blob path (key) in DB
    public async Task<string> SaveAsync(SaveMediaDto dto)
    {
        if (dto.FileStream is null) throw new ArgumentNullException(nameof(dto.FileStream));

        var ext = Path.GetExtension(dto.FileName);
        var unique = $"{Guid.NewGuid():N}{ext}";
        var folder = (dto.Folder ?? "").Trim().TrimStart('/').TrimEnd('/').Replace('\\', '/');
        var blobName = string.IsNullOrWhiteSpace(folder) ? unique : $"{folder}/{unique}";

        var blob = _container.GetBlobClient(blobName);
        await EnsureContainerExistsAsync();

        try
        {
            await blob.UploadAsync(
                dto.FileStream,
                new BlobUploadOptions
                {
                    HttpHeaders = new BlobHttpHeaders { ContentType = dto.ContentType }
                },
                dto.ct
            );
        }
        catch (RequestFailedException ex) when (ex.ErrorCode == BlobErrorCode.ContainerNotFound)
        {
            await _container.CreateIfNotExistsAsync(PublicAccessType.None, cancellationToken: dto.ct);
            if (dto.FileStream.CanSeek) dto.FileStream.Position = 0;
            await blob.UploadAsync(
                dto.FileStream,
                new BlobUploadOptions
                {
                    HttpHeaders = new BlobHttpHeaders { ContentType = dto.ContentType }
                },
                dto.ct
            );
        }

        return blobName; // path/key
    }

    // Match interface: return whether a blob was deleted
    public async Task<bool> DeleteAsync(string relativeUrl, CancellationToken ct = default)
    {
        var name = ExtractBlobName(relativeUrl);
        var resp = await _container.DeleteBlobIfExistsAsync(
            name,
            DeleteSnapshotsOption.IncludeSnapshots,
            cancellationToken: ct
        );
        return resp.Value;
    }

    public async Task<int> DeletePrefixAsync(string folderPrefix, CancellationToken ct = default)
    {
        var prefix = folderPrefix.Trim().TrimStart('/').TrimEnd('/') + "/";

        int count = 0;
        await foreach (var item in _container.GetBlobsAsync(prefix: prefix, cancellationToken: ct))
        {
            await _container.DeleteBlobIfExistsAsync(
                item.Name,
                DeleteSnapshotsOption.IncludeSnapshots,
                cancellationToken: ct
            );
            count++;
        }
        return count;
    }

    public Uri GetReadUri(string keyOrUrl, TimeSpan? ttl = null)
    {
        var name = ExtractBlobName(keyOrUrl);
        var blob = _container.GetBlobClient(name);

        if (!_useSasLinks) return blob.Uri;

        if (!blob.CanGenerateSasUri)
            throw new InvalidOperationException("Cannot generate SAS (no account key).");

        var sas = new BlobSasBuilder
        {
            BlobContainerName = blob.BlobContainerName,
            BlobName = blob.Name,
            Resource = "b",
            ExpiresOn = DateTimeOffset.UtcNow.Add(ttl ?? _sasTtl),
            Protocol = SasProtocol.HttpsAndHttp // Azurite http, Azure https
        };
        sas.SetPermissions(BlobSasPermissions.Read);
        return blob.GenerateSasUri(sas);
    }

    // --- helpers ---

    private async Task EnsureContainerExistsAsync()
    {
        try { await _container.GetPropertiesAsync(); }
        catch (RequestFailedException ex) when (ex.Status == 404)
        {
            await _container.CreateIfNotExistsAsync(PublicAccessType.None);
        }
    }

    private string ExtractBlobName(string keyOrUrl)
    {
        if (Uri.TryCreate(keyOrUrl, UriKind.Absolute, out var uri))
        {
            var path = uri.AbsolutePath.Trim('/'); // e.g. "media/blogs/28/abc.png"
            var idx = path.IndexOf('/');
            if (idx > 0 && path[..idx].Equals(_container.Name, StringComparison.OrdinalIgnoreCase))
                return path[(idx + 1)..]; // strip container
            return path;
        }
        return keyOrUrl.TrimStart('/');
    }
}
