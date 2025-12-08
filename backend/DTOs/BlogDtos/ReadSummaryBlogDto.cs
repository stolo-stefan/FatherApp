namespace backend.DTOs.BlogDtos;

public record class ReadSummaryBlogDto(
    int Id,
    string Title,
    string Content,
    DateTime DatePosted,
    string Summary,
    bool IsVisible,
    string Slug
);
