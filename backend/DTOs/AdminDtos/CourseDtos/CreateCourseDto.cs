public record class CreateCourseDto(
    string Title,
    string Description,
    DateTime StartDate,
    DateTime EarlierDate,
    int NrOfSeats,
    bool IsFree,
    int PriceInCents
);