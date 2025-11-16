public record class ReadCourseDto(
    int Id,
    string Title,
    string Description,
    DateTime StartDate,
    DateTime EarlierDate,
    int NrOfSeats,
    bool IsFree,
    string Currency,
    int PriceInCents
);