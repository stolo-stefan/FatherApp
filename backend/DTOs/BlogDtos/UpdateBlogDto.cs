namespace backend.DTOs.BlogDtos;

public record class UpdateBlogDto(
    string? Title,
    string? Content,
    bool? IsVisible
);