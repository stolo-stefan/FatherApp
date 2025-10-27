using backend.Entities;

namespace backend.DTOs.MediaDtos;

public record class MediaDto(
    int Id,
    string Url,
    string Path,          // stored blob path from DB (e.g., blogs/31/....jpg)
    MediaKind Kind,
    string ViewUrl       // SAS URL to use in <img src> / <video src>
);