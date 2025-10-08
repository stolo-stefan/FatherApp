namespace backend.Entities;

public class Blog
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Content { get; set; }
    public int? MediaId { get; set; }
    public DateTime DatePosted { get; set; }
    public bool IsVisible { get; set; } = false;
}
