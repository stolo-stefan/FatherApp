using System.ComponentModel.DataAnnotations;

namespace backend.Entities;

public class Course
{
    [Key]
    public int Id { get; set; }

    [Required]
    public required string Title { get; set; }

    [Required]
    public required DateTime StartDate { get; set; }

    [Required]
    public required DateTime EndDate { get; set; }
    public required int AvailableSlots { get; set; }
}
