using backend.Data;
using backend.DTOs.BlogDtos;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.BlogServices;

public class BlogService : IBlogService
{
    private readonly EntityContext _db;

    public BlogService(EntityContext db)
    {
        _db = db;
    }
    public CreateBlogResult CreateBlog(CreateBlogDto dto)
    {
        try
        {

            Blog? blog = BlogConverter.CreateDtoToBlogEntity(dto);
            if (blog == null)
                return new CreateBlogResult(false, "Title and content fields are mandatory", null);
            
            // IMPORTANT: Media should be uploaded via /media endpoints after blog exists.
            // Ignore dto.Media here to keep transactions clean.

            _db.Blogs.Add(blog);
            _db.SaveChanges();

            return new CreateBlogResult(true, "Blog created.", blog);
        }
        catch (Exception ex)
        {
            return new CreateBlogResult(false, $"Failed to create blog: {ex.Message}", null);
        }
    }

    public bool DeleteBlog(int id)
    {
        var blog = _db.Blogs.Find(id);
        if (blog is null) return false;

        _db.Blogs.Remove(blog); // Cascade to Media (per model config)
        _db.SaveChanges();
        return true;
    }

    public ReadDetailedBlogDto? ReadBlog(int id)
    {
        var blog = _db.Blogs.Include(b => b.Media).FirstOrDefault(b => b.Id == id);
        if (blog is null) return null;

        return new ReadDetailedBlogDto(
            blog.Id,
            blog.Title,
            blog.Content,
            blog.Media,
            blog.DatePosted
        );
    }

    public List<ReadSummaryBlogDto> ReadVisibleBlogs()
    {
        return _db.Blogs
            .Where(b => b.IsVisible)
            .OrderByDescending(b => b.DatePosted)
            .Select(b => new ReadSummaryBlogDto(b.Id, b.Title, b.Content))
            .ToList();
    }

    public List<ReadSummaryBlogDto> ReadAllBlogs()
    {
        return _db.Blogs
            .OrderByDescending(b => b.DatePosted)
            .Select(b => new ReadSummaryBlogDto(b.Id, b.Title, b.Content))
            .ToList();
    }

    public bool UpdateBlog(int id, UpdateBlogDto dto)
    {
        var blog = _db.Blogs.Find(id);
        if (blog is null) return false;

        if (dto.Title is not null)
            blog.Title = dto.Title;

        if (dto.Content is not null)
            blog.Content = dto.Content;

        if (dto.IsVisible.HasValue)
            blog.IsVisible = dto.IsVisible.Value;

        _db.SaveChanges();
        return true;
    }
}
