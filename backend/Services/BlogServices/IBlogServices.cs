using backend.DTOs.BlogDtos;

namespace backend.Services.BlogServices;

public interface IBlogService
{
    //CRUD
    //Create blog
    Task<CreateBlogResult> CreateBlog(CreateBlogDto dto);

    //Read blog/s
    Task<BlogDetailDto?> ReadDetailedBlog(int id);
    Task<ReadSummaryBlogDto?> ReadSummaryBlog(int id);
    Task<List<ReadSummaryBlogDto>> ReadVisibleBlogs();
    Task<List<ReadSummaryBlogDto>> ReadAllBlogs();

    //Update blog
    Task<bool> UpdateBlog(int id, UpdateBlogDto dto);

    //Set blog visibility
    Task<(bool, bool)> UpdateBlogToVisible(int id);
    Task<(bool, bool)> UpdateBlogToNonVisible(int id);

    //Delete blog
    Task<bool> DeleteBlog(int id);
}
