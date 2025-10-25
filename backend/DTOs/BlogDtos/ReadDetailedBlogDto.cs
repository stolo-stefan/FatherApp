using backend.Entities;

namespace backend.DTOs.BlogDtos;

public record class ReadDetailedBlogDto(
    int Id,
    string Title,
    string Content,
    List<Media> Media,
    DateTime DatePosted
);
