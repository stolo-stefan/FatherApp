using backend.Data;
using backend.DTOs.BlogDtos;
using backend.DTOs.MediaDtos;
using backend.Entities;
using backend.Services.StorageServices;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.BlogServices;

public class BlogService : IBlogService
{
    private readonly EntityContext _db;
    private readonly IStorageServices _storage;

    public BlogService(EntityContext db, IStorageServices storage)
    {
        _db = db;
        _storage = storage;
    }
    public async Task<CreateBlogResult> CreateBlog(CreateBlogDto dto)
    {
        try
        {

            Blog? blog = BlogConverter.CreateDtoToBlogEntity(dto);
            if (blog == null)
                return new CreateBlogResult(false, "Title, content and summary fields are mandatory", null);
            
            // IMPORTANT: Media should be uploaded via /media endpoints after blog exists.
            // Ignore dto.Media here to keep transactions clean.

            await _db.Blogs.AddAsync(blog);
            await _db.SaveChangesAsync();

            return new CreateBlogResult(true, "Blog created.", blog);
        }
        catch (Exception ex)
        {
            return new CreateBlogResult(false, $"Failed to create blog: {ex.Message}", null);
        }
    }

    public async Task<bool> DeleteBlog(int id)
    {
        var blog = await _db.Blogs.FindAsync(id);
        if (blog is null) return false;

        _db.Blogs.Remove(blog); // Cascade to Media (per model config)
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<BlogDetailDto?> ReadDetailedBlog(int id)
    {
        var blog = await _db.Blogs
        .Include(b => b.Media)
        .AsNoTracking()
        .FirstOrDefaultAsync(b => b.Id == id);

        if (blog is null) return null;

        var mediaDtos = blog.Media
            .OrderBy(m => m.Id)
            .Select(m => new ReadMediaDto(
                m.Id,
                m.Url,                         // path stored in DB
                m.Kind,
                _storage.GetReadUri(m.Url).ToString(), // SAS for browser
                m.OriginalFileName,
                m.ContentType,
                m.SizeBytes
            ))
            .ToList();

        return new BlogDetailDto(
            blog.Id, blog.Title, blog.Content,
            blog.DatePosted, blog.IsVisible, mediaDtos
        );
    }

    public async Task<ReadSummaryBlogDto?> ReadSummaryBlog(int id)
    {
        var blog = await _db.Blogs
            .AsNoTracking()
            .Include(b => b.Media)
            .FirstOrDefaultAsync(b => b.Id == id);

        return blog is null ? null
            : new ReadSummaryBlogDto(
                blog.Id,
                blog.Title,
                blog.Content,
                blog.DatePosted,
                blog.Summary,
                blog.IsVisible
            );
    }

    public async Task<List<ReadSummaryBlogDto>> ReadVisibleBlogs()
    {
        return await _db.Blogs
            .Where(b => b.IsVisible)
            .OrderByDescending(b => b.DatePosted)
            .Select(b => new ReadSummaryBlogDto(b.Id, b.Title, b.Content, b.DatePosted, b.Summary, b.IsVisible))
            .ToListAsync();
    }

    public async Task<List<ReadSummaryBlogDto>> ReadAllBlogs()
    {
        return await _db.Blogs
            .OrderByDescending(b => b.DatePosted)
            .Select(b => new ReadSummaryBlogDto(b.Id, b.Title, b.Content, b.DatePosted, b.Summary, b.IsVisible))
            .ToListAsync();
    }

    public async Task<bool> UpdateBlog(int id, UpdateBlogDto dto)
    {
        var blog = await _db.Blogs.FindAsync(id);
        if (blog is null) return false;

        if (dto.Title is not null)
            blog.Title = dto.Title;

        if (dto.Content is not null)
            blog.Content = dto.Content;

        if (dto.Summary is not null)
            blog.Summary = dto.Summary;

        if (dto.IsVisible.HasValue)
            blog.IsVisible = dto.IsVisible.Value;

        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<(bool, bool)> UpdateBlogToVisible(int id)
    {
        var blog = await _db.Blogs.FindAsync(id);
        if (blog is null) return (false, false);

        if (blog.IsVisible) return (true, false);

        blog.IsVisible = true;
        await _db.SaveChangesAsync();
        return (true, true);
    }
    
    public async Task<(bool, bool)> UpdateBlogToNonVisible(int id)
    {
        var blog = await _db.Blogs.FindAsync(id);
        if (blog is null) return (false, false);

        if (!blog.IsVisible) return (true, false);

        blog.IsVisible = false;
        await _db.SaveChangesAsync();
        return (true, true);
    }

}
