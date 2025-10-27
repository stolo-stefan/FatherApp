using backend.Entities;

namespace backend.DTOs.MediaDtos;

public record class ReadMediaDto(
    int Id,
    string Path,              // stored path from DB (Media.Url)
    MediaKind Kind,
    string ViewUrl,           // SAS URL to use in <img>/<video>
    string? OriginalFileName,
    string? ContentType,
    long SizeBytes
);