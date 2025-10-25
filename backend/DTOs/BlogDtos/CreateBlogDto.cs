namespace backend.DTOs.BlogDtos;

public record class CreateBlogDto(
    string Title,
    string Content,
    string Summary
);
