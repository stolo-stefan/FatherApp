public record class EnrollmentCreatedDto(
    int? EnrollmentId,
    string Status = "enrolled"
);