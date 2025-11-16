using backend.Entities;

public record class CreateCourseResult(
    bool Success,
    string Message,
    Course? Entity
);