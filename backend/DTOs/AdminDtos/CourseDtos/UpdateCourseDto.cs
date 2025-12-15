public record class UpdateCourseDto(
    string? Title,
    string? Description,
    DateTime? StartDate,
    int? NrOfSeats,
    bool? IsFree,
    string? Currency,
    int? PriceInCents,
    string? GetResponseToken,
    string? WhatsappLink
);