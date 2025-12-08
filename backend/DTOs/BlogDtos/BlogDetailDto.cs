using backend.DTOs.MediaDtos;

namespace backend.DTOs.BlogDtos;

public record class BlogDetailDto(
    int Id,
    string Title,
    string Content,
    DateTime DatePosted,
    bool IsVisible,
    List<ReadMediaDto> Media,
    string Slug
);