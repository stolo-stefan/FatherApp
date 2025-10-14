namespace backend.Services.StorageServices;

public record class MediaOptions
{
    public long MaxImageBytes { get; set; } = 10L * 1024 * 1024;   // 10 MB
    public long MaxVideoBytes { get; set; } = 500L * 1024 * 1024;  // 500 MB

    // MIME allowlist
    public string[] AllowedContentTypes { get; set; } =
    {
        "image/png", "image/jpeg", "image/webp",
        "video/mp4", "video/webm", "video/quicktime"
    };
}
