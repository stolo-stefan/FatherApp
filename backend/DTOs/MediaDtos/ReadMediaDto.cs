using backend.Entities;

namespace backend.DTOs.MediaDtos;

public record class ReadMediaDto(
    int Id,
    int BlogId,
    string Url,
    string? OriginalFileName,
    long SizeBytes,
    string? ContentType,
    string StorageProvider,
    MediaKind Kind
);