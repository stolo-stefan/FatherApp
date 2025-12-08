using System.ComponentModel.DataAnnotations;

namespace backend.Entities;

public class Blog
{
    [Key]
    public int Id { get; set; }

    [Required]
    public required string Title { get; set; }

    [Required]
    public required string Content { get; set; }
    [Required]
    public required string Summary { get; set; }
    public List<Media> Media { get; set; } = new();
    public DateTime DatePosted { get; set; }
    public bool IsVisible { get; set; } = false;
    public required string Slug {get; set;}
}
