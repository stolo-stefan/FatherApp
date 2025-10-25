namespace backend.DTOs.BlogDtos;

public record class UpdateBlogDto(
    string? Title,
    string? Content,
    string? Summary,
    bool? IsVisible
);