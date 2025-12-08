using System;
using System.Text.RegularExpressions;
using backend.Data;
using backend.Entities;

namespace backend.DTOs.BlogDtos;

public class BlogConverter
{
    public static Blog?CreateDtoToBlogEntity(CreateBlogDto dto)
    {

        if (string.IsNullOrWhiteSpace(dto.Title) || string.IsNullOrWhiteSpace(dto.Content))
            return null;
        string cleaned = Regex.Replace(dto.Title, @"[^A-Za-z0-9\u00C0-\u017F\s]", "");
        cleaned = cleaned.Trim().Replace(" ", "-").ToLower();
        var blog = new Blog
        {
            Title = dto.Title,
            Content = dto.Content,
            Summary = dto.Summary,
            DatePosted = DateTime.UtcNow,
            IsVisible = false,
            Slug = cleaned
        };

        return blog;
    }
}
