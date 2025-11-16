using backend.Entities;

public static class CourseConverter
{
    public static Course? CreateDtoToCourseEntity(CreateCourseDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Title) ||
            string.IsNullOrWhiteSpace(dto.Description))
            return null;

        // Business rules
        if (dto.NrOfSeats < 0) return null;
        if (dto.IsFree && dto.PriceInCents != 0) return null;
        if (!dto.IsFree && dto.PriceInCents <= 0) return null;

        return new Course
        {
            Title = dto.Title.Trim(),
            Description = dto.Description.Trim(),
            StartDate = DateTime.SpecifyKind(dto.StartDate, DateTimeKind.Utc),
            EarlierDate = DateTime.SpecifyKind(dto.EarlierDate, DateTimeKind.Utc),
            NrOfSeats = dto.NrOfSeats,
            IsFree = dto.IsFree,
            Currency = "EUR",            // defaulted by your entity; explicit here for clarity
            PriceInCents = dto.PriceInCents
        };
    }
}
