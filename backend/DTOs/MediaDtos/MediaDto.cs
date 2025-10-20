using backend.Entities;

namespace backend.DTOs.MediaDtos;

public record class MediaDto(
    int Id,
    string Url,
    MediaKind Kind
);