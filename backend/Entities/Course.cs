using System.ComponentModel.DataAnnotations;

namespace backend.Entities;

public class Course
{
    [Key]
    public int Id { get; set; }

    [Required]
    public required string Title { get; set; }
    public required string Description { get; set; }

    [Required]
    public required DateTime StartDate { get; set; }

    [Required]
    public required DateTime EarlierDate { get; set; }

    public required int NrOfSeats { get; set; }

    public required bool IsFree { get; set; }
    public required string Currency { get; set; } = "EUR";

    public required int PriceInCents { get; set; }
    public List<EnrollmentList> Enrollments { get; set; } = new();
}
