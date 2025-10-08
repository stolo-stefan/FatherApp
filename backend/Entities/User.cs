namespace backend.Entities;

public class User
{
    public int Id { get; set; }
    public int? EnrolledCourseId { get; set; } = 0;
    public required string Email { get; set; }
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string? AdminPassword { get; set; }
    public string Role { get; set; } = "user"; //admin or user
    public bool IsNewsLetterSub { get; set; } = false;
}
