using System;
using backend.Data;
using backend.Entities;

namespace backend.DTOs.BlogDtos;

public class BlogConverter
{
    public static Blog?CreateDtoToBlogEntity(CreateBlogDto dto)
    {

        if (string.IsNullOrWhiteSpace(dto.Title) || string.IsNullOrWhiteSpace(dto.Content))
            return null;

        var blog = new Blog
        {
            Title = dto.Title,
            Content = dto.Content,
            Summary = dto.Summary,
            DatePosted = DateTime.UtcNow,
            IsVisible = false
        };

        return blog;
    }
}
