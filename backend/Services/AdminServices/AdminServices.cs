using backend.Data;
using backend.DTOs;
using backend.DTOs.AdminDtos;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.AdminServices;

public class AdminService : IAdminService
{

    private readonly EntityContext dbContext;
    private readonly IEmailSender _email;
    public AdminService(EntityContext db, IEmailSender email)
    {
        dbContext = db;
        _email = email;
    }

    //Create admin
    public async Task<CreateAdminResult> CreateAdminAsync(CreateAdminDto dto)
    {
        var newUser = await AdminConverters.CreateDtoToUserEntityAsync(dto, dbContext);
        if (newUser == null)
            return new CreateAdminResult(
                false,
                "Admin with same email already exists",
                null
            );

        newUser.Role = "admin";
        newUser.AdminPassword = BCrypt.Net.BCrypt.HashPassword(dto.AdminPassword);

        await dbContext.Users.AddAsync(newUser);
        await dbContext.SaveChangesAsync();

        return new CreateAdminResult(
            true,
            "Created successfully",
            newUser
        );
    }

    //Read admin/s
    public async Task<ReadAdminDto?> ReadAdminAsync(int id)
    {
        var foundUser = await dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id && u.Role == "admin");

        return foundUser is null ? null : AdminConverters.EntityToReadDto(foundUser);
    }
    public async Task<List<ReadAdminDto>> ReadAdminsAsync()
    {
        return await dbContext.Users
            .AsNoTracking()
            .Where(u => u.Role == "admin")
            .Select(u => AdminConverters.EntityToReadDto(u))
            .ToListAsync();
    }

    //Update admin
    public async Task<bool> UpdateAdminAsync(int id, UpdateAdminDto dto)
    {
        var foundAdmin = await dbContext.Users.FindAsync(id);
        if (foundAdmin is null || !IsAdmin(foundAdmin))
            return false;

        if (!string.IsNullOrWhiteSpace(dto.Email))
            foundAdmin.Email = dto.Email;
        if (!string.IsNullOrWhiteSpace(dto.Name))
            foundAdmin.Name = dto.Name;
        

        await dbContext.SaveChangesAsync();
        return true;
    }
    // public bool UpdateAdminPassword(int id, UpdateAdminPasswordDto dto)
    // {
    //     var foundAdmin = dbContext.Users.Find(id);
    //     if (foundAdmin == null)
    //         return false;
    //     if (!string.IsNullOrWhiteSpace(dto.AdminPassword))
    //         foundAdmin.AdminPassword = dto.AdminPassword;

    //     dbContext.Users.Update(foundAdmin);
    //     dbContext.SaveChanges();

    //     return true;
    // }

    //Delete admin
    public async Task<bool> DeleteAdminAsync(int id)
    {
        var foundAdmin = await dbContext.Users.FindAsync(id);
        if (foundAdmin is null || !IsAdmin(foundAdmin))
            return false;

        dbContext.Users.Remove(foundAdmin);
        await dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<EnrolledUserDto?> ReadEnrolledUserAsync(int courseId, int userId)
    {
        var enrollment = await dbContext.EnrollmentLists
        .Include(e => e.User)
        .FirstOrDefaultAsync(e => e.UserId == userId && e.CourseId == courseId);

        if (enrollment is null) return null;

        var form = enrollment.FormAnswers ?? new Dictionary<string, object?>();

        form.TryGetValue("phoneNumber", out var phone);
        form.TryGetValue("participationChoice", out var participation);
        form.TryGetValue("courseSource", out var source);

        return new(
            Name: enrollment.User.Name ?? "",
            Email: enrollment.User.Email ?? "",
            PhoneNumber: phone?.ToString() ?? "",
            ParticipationChoice: participation?.ToString() ?? "",
            CourseSource: source?.ToString() ?? "",
            Status: enrollment.Status,
            PaymentChoice: enrollment.PaymentChoice
        );
    }
    public async Task<List<EnrolledSummaryPerCourseDto>> ReadEnrolledInCourse(int courseId)
    {
        var enrolledList = await dbContext.EnrollmentLists
            .AsNoTracking()
            .Where(e => e.CourseId == courseId)
            .Select(e => AdminConverters.EnrolledEntityToSummaryDto(e.User, e))
            .ToListAsync();
        return enrolledList;
    }

    public async Task<bool> DeleteEnrolledUser(int courseId, int userId)
    {
        var user = await dbContext.EnrollmentLists.FirstOrDefaultAsync(e => e.CourseId == courseId && e.UserId == userId);
        if (user is null)
            return false;
        dbContext.EnrollmentLists.Remove(user);
        await dbContext.SaveChangesAsync();

        return true;
    }

    public async Task<bool> UpdatePaymentStatus(EnrolledPaymentUpdate dto, CancellationToken ct = default)
    {
    // Load enrollment + navigations for email content
    var enrollment = await dbContext.EnrollmentLists
        .Include(e => e.User)
        .Include(e => e.Course)
        .FirstOrDefaultAsync(e => e.UserId == dto.UserId && e.CourseId == dto.CourseId, ct);

    if (enrollment is null) return false;

    // Allow only known statuses; tweak if you use more
    var allowed = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
    {
        "pending", "enrolled", "cancelled"
    };
    if (!allowed.Contains(dto.Status)) return false;

    // No change → nothing to do
    if (string.Equals(enrollment.Status, dto.Status, StringComparison.OrdinalIgnoreCase))
        return true;

    // Update status
    var wasPending = enrollment.Status.Equals("pending", StringComparison.OrdinalIgnoreCase);
    enrollment.Status = dto.Status.ToLowerInvariant();

    // If marking as enrolled, you may want to stamp the moment it became active
    if (enrollment.Status == "enrolled" && wasPending)
    {
        enrollment.EnrolledAt = DateTime.UtcNow; // optional: set/refresh activation time
    }

    await dbContext.SaveChangesAsync(ct);

    // Send email only when transitioning to enrolled
    if (enrollment.Status == "enrolled")
    {
        var user = enrollment.User;
        var course = enrollment.Course;

        var subject = $"Confirmare inscriere — {course.Title}";
        var body = $@"
Salut {user.Name ?? "acolo"},

Plata a fost confirmata. Statusul tau este acum: ENROLLED.

Curs: {course.Title}
Data de start: {course.StartDate:yyyy-MM-dd}

Ne vedem la curs!
Echipa Aspiring Managers
";

        await _email.SendAsync(user.Email, subject, body, ct);
    }

    return true;
}

    private static bool IsAdmin(User u)
        => string.Equals(u.Role, "admin", StringComparison.OrdinalIgnoreCase);
}
