public record class EnrolledUserDto(
    string FirstName,
    string LastName,
    string Email,
    string PhoneNumber,
    string ParticipationChoice,
    string CourseSource,
    string Status,
    int PaymentChoice
);