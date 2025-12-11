using backend.Data;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.CourseServices;

public class CourseService : ICourseService
{
    private readonly EntityContext _db;

    public CourseService(EntityContext db)
    {
        _db = db;
    }

    public async Task<CreateCourseResult> CreateCourse(CreateCourseDto dto)
    {
        try
        {
            var course = CourseConverter.CreateDtoToCourseEntity(dto);
            if (course == null)
                return new CreateCourseResult(false, "Invalid course payload.", null);

            // Optional uniqueness: Title + StartDate
            var exists = await _db.Courses
                .AnyAsync(c => c.Title == course.Title && c.StartDate == course.StartDate);
            if (exists)
                return new CreateCourseResult(false, "Course with same Title and StartDate already exists.", null);

            await _db.Courses.AddAsync(course);
            await _db.SaveChangesAsync();

            return new CreateCourseResult(true, "Course created.", course);
        }
        catch (Exception ex)
        {
            return new CreateCourseResult(false, $"Failed to create course: {ex.Message}", null);
        }
    }

    public async Task<bool> DeleteCourse(int id)
    {
        var course = await _db.Courses.FindAsync(id);
        if (course is null) return false;

        _db.Courses.Remove(course);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<ReadCourseDto?> ReadCourse(int id)
    {
        return await _db.Courses
            .AsNoTracking()
            .Where(c => c.Id == id)
            .Select(c => new ReadCourseDto(
                c.Id, c.Title, c.Description, c.StartDate, c.EarlierDate,
                c.NrOfSeats, c.IsFree, c.Currency, c.PriceInCents))
            .FirstOrDefaultAsync();
    }

    public async Task<List<ReadCourseDto>> ReadAllCourses()
    {
        return await _db.Courses
            .AsNoTracking()
            .OrderByDescending(c => c.StartDate)
            .Select(c => new ReadCourseDto(
                c.Id, c.Title, c.Description, c.StartDate, c.EarlierDate,
                c.NrOfSeats, c.IsFree, c.Currency, c.PriceInCents))
            .ToListAsync();
    }

    public async Task<bool> UpdateCourse(int id, UpdateCourseDto dto)
    {
        var course = await _db.Courses.FirstOrDefaultAsync(c => c.Id == id);
        if (course is null) return false;

        if (dto.Title is not null) course.Title = dto.Title;
        if (dto.Description is not null) course.Description = dto.Description;
        if (dto.StartDate.HasValue) course.StartDate = DateTime.SpecifyKind(dto.StartDate.Value, DateTimeKind.Utc);
        if (dto.NrOfSeats.HasValue) course.NrOfSeats = dto.NrOfSeats.Value;
        if (dto.IsFree.HasValue) course.IsFree = dto.IsFree.Value;
        if (dto.Currency is not null) course.Currency = dto.Currency.Trim().ToUpperInvariant();
        if (dto.PriceInCents.HasValue) course.PriceInCents = dto.PriceInCents.Value;

        // Cross-field validation after applying updates
        if (course.NrOfSeats < 0) return false;
        if (course.IsFree && course.PriceInCents != 0) return false;
        if (!course.IsFree && course.PriceInCents <= 0) return false;

        // Optional uniqueness (if Title/StartDate changed)
        var dup = await _db.Courses.AnyAsync(c =>
            c.Id != course.Id &&
            c.Title == course.Title &&
            c.StartDate == course.StartDate);
        if (dup) return false;

        await _db.SaveChangesAsync();
        return true;
    }
    public async Task<ReadCourseDto?> ReadMostRecentCourse()
    {
        // Decide what “most recent” means:
        // here we pick the course with the latest StartDate.
        var today = DateTime.UtcNow.Date;

        var course = await _db.Courses
            .Where(c => c.StartDate >= today)
            .OrderBy(c => c.StartDate)
            .FirstOrDefaultAsync();


        if (course is null)
            return null;

        int nrEnrolledUsers = await _db.EnrollmentLists.Where(e => e.CourseId == course.Id).CountAsync();
        int nrOfAvailableSeats = default(int);

        if(nrEnrolledUsers >= course.NrOfSeats)
            nrOfAvailableSeats = 1;
        else
            nrOfAvailableSeats = course.NrOfSeats - nrEnrolledUsers;

        // Map entity -> DTO (adapt to your actual DTO)
        return new ReadCourseDto(
            course.Id,
            course.Title,
            course.Description,
            course.StartDate,
            course.EarlierDate,
            nrOfAvailableSeats, //course.NrOfSeats
            course.IsFree,
            course.Currency,
            course.PriceInCents
        );
    }

    public async Task<ReadCourseWhatsappDto?> ReadThankYouCourse()
    {
        // Decide what “most recent” means:
        // here we pick the course with the latest StartDate.
        var today = DateTime.UtcNow.Date;

        var course = await _db.Courses
            .Where(c => c.StartDate >= today)
            .OrderBy(c => c.StartDate)
            .FirstOrDefaultAsync();


        if (course is null)
            return null;

        int nrEnrolledUsers = await _db.EnrollmentLists.Where(e => e.CourseId == course.Id).CountAsync();
        int nrOfAvailableSeats = course.NrOfSeats - nrEnrolledUsers;

        // Map entity -> DTO (adapt to your actual DTO)
        return new ReadCourseWhatsappDto(
            course.Id,
            course.Title,
            course.Description,
            course.StartDate,
            course.EarlierDate,
            nrOfAvailableSeats, //course.NrOfSeats
            course.IsFree,
            course.Currency,
            course.PriceInCents,
            course.WhatsappLink
        );
    }
}
