using backend.Entities;

namespace backend.DTOs.BlogDtos;

public record class CreateBlogResult(
    bool Success,
    string Message,
    Blog? Entity
);
