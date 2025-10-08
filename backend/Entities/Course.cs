namespace backend.Entities;

public class Course
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required DateTime StartDate { get; set; }
    public required DateTime EndDate { get; set; }
    public required int AvailableSlots { get; set; }
}
