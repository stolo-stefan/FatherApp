using backend.DTOs.BlogDtos;

namespace backend.Services.BlogServices;

public interface IBlogService
{
    //CRUD
    //Create blog
    CreateBlogResult CreateBlog(CreateBlogDto dto);

    //Read blog/s
    ReadDetailedBlogDto? ReadBlog(int id);
    List<ReadSummaryBlogDto> ReadVisibleBlogs();
    List<ReadSummaryBlogDto> ReadAllBlogs();

    //Update blog
    bool UpdateBlog(int id, UpdateBlogDto dto);

    //Delete blog
    bool DeleteBlog(int id);
}
