using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entities;

public enum MediaKind { Image, Video }

public class Media
{
    [Key]
    public int Id { get; set; }
    [ForeignKey("Blog")]
    public int BlogId { get; set; }
    public Blog Blog { get; set; } = default!;

    // Where it can be fetched from (relative URL for Local; absolute for CDN)
    [Required] public string Url { get; set; } = default!;       // e.g. "/uploads/blogs/5/abc123.png"
    public string? OriginalFileName { get; set; }
    public long SizeBytes { get; set; }
    public string? ContentType { get; set; }
    public string StorageProvider { get; set; } = "Local";       // "Local" | "S3" | "Azure"
    public MediaKind Kind { get; set; } = MediaKind.Image;
}
