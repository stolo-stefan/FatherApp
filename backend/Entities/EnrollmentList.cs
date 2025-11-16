using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using backend.Entities;

public class EnrollmentList
{
    [Key] public int Id { get; set; } // you can use an Id OR a composite key — see config below

    [Required, ForeignKey("User")]
    public int UserId { get; set; }

    [Required, ForeignKey("Course")]
    public int CourseId { get; set; }

    // Optional extra columns you might want:
    public string? FormAnswersJson { get; set; }

    // Optional helper property to work with structured data
    [NotMapped]
    public Dictionary<string, object>? FormAnswers
    {
        get => string.IsNullOrEmpty(FormAnswersJson)
            ? null
            : JsonSerializer.Deserialize<Dictionary<string, object>>(FormAnswersJson);
        set => FormAnswersJson = JsonSerializer.Serialize(value);
    }
    public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = "pending"; // e.g., pending / enrolled / completed

    public int PaymentChoice { get; set; } = 0; // (EUR) 0 = free, 1 = deodata inainte de data inceperii, 2 = pana in data inceperii, 3 = in rate
    // Navigation
    public User User { get; set; } = null!;
    public Course Course { get; set; } = null!;
}
