using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entities;

public class User
{
    [Key]
    public int Id { get; set; }

    [ForeignKey("Course")]
    public int? EnrolledCourseId { get; set; } = 0;

    [Required]
    [EmailAddress]
    [MaxLength(255)]
    public string Email { get; set; } = null!;

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    [MinLength(8)]
    [MaxLength(100)]
    public string? AdminPassword { get; set; }

    public string Role { get; set; } = "user"; //admin or user

    [Required]
    public bool IsNewsLetterSub { get; set; } = false;
    public bool WelcomeEmailSent { get; set; }
}
