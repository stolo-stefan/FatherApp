using System.Text.Json;
using backend.Data;
using backend.Entities;
using backend.Services.Email;
using backend.Services.GetResponse;
using Microsoft.EntityFrameworkCore;

public sealed class CourseEnrollmentService : ICourseEnrollmentService
{
    private readonly EntityContext _db;
    private readonly IEmailSender _email;

    public CourseEnrollmentService(EntityContext db, IEmailSender email)
    {
        _db = db;
        _email = email;
    }

    private static string NormalizeOptional(string? value)
        => string.IsNullOrWhiteSpace(value) ? "" : value.Trim();

    public async Task<EnrollmentResult> EnrollFreeAsync(
        int courseId,
        IGetResponseClient grClient,
        FreeCourseFormDto form,
        CancellationToken ct = default)
    {
        Console.WriteLine("DEBUG: EnrollFreeAsync was called");
        // 1) Basic validation
        if (string.IsNullOrWhiteSpace(form.Email) ||
            string.IsNullOrWhiteSpace(form.FirstName) ||
            string.IsNullOrWhiteSpace(form.LastName))
        {
            return EnrollmentResult.Fail(EnrollmentOutcome.InvalidInput, "Missing required fields.");
        }

        // Normalize required fields
        var email = form.Email.Trim().ToLowerInvariant();
        var firstName = form.FirstName.Trim();
        var lastName  = form.LastName.Trim();

        // Normalize optional fields (no nulls)
        var phoneNumber         = NormalizeOptional(form.PhoneNumber);
        var participationChoice = NormalizeOptional(form.ParticipationChoice);
        var courseSource        = NormalizeOptional(form.CourseSource);

        // 2) Load course
        var course = await _db.Courses.AsNoTracking().FirstOrDefaultAsync(c => c.Id == courseId, ct);
        if (course is null) return EnrollmentResult.Fail(EnrollmentOutcome.CourseNotFound, "Course not found.");
        if (!course.IsFree) return EnrollmentResult.Fail(EnrollmentOutcome.NotFreeCourse, "This path is for free courses only.");

        // 3) Get or create user (don’t clobber existing values)
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email, ct);
        bool isNewUser = false;
        if (user is null)
        {
            isNewUser = true;
            user = new User
            {
                Email = email,
                FirstName = firstName,
                LastName  = lastName,
            };

            await _db.Users.AddAsync(user, ct);
        }
        else
        {
            if (string.IsNullOrWhiteSpace(user.FirstName) && !string.IsNullOrWhiteSpace(firstName))
                user.FirstName = firstName;
            if (string.IsNullOrWhiteSpace(user.LastName) && !string.IsNullOrWhiteSpace(lastName))
                user.LastName = lastName;
        }

        // 4) Capacity check (non-cancelled)
        var enrolledCount = await _db.EnrollmentLists
            .CountAsync(e => e.CourseId == courseId && e.Status != "cancelled", ct);
        if (enrolledCount >= course.NrOfSeats)
            return EnrollmentResult.Fail(EnrollmentOutcome.CourseFull, "No seats available.");

        // 5) Duplicate enrollment check
        var alreadyEnrolled = await _db.EnrollmentLists
            .Include(e => e.User)
            .AnyAsync(e => e.CourseId == courseId &&
                        e.Status != "cancelled" &&
                        e.User.Email == email, ct);
        if (alreadyEnrolled)
            return EnrollmentResult.Fail(EnrollmentOutcome.AlreadyEnrolled, "User already enrolled for this course.");

        // 6) Build JSON form answers (no nulls except the 3 required fields, which are non-null anyway)
        var answers = new Dictionary<string, object?>
        {
            ["firstName"]          = firstName,     // non-null
            ["lastName"]           = lastName,      // non-null
            ["email"]              = email,         // non-null
            ["phoneNumber"]        = phoneNumber,   // "" instead of null
            ["participationChoice"]= participationChoice,
            ["courseSource"]       = courseSource
        };
        var answersJson = JsonSerializer.Serialize(answers);

        // 7) Create enrollment
        var enrollment = new EnrollmentList
        {
            User           = user,
            CourseId       = courseId,
            FormAnswersJson= answersJson,
            EnrolledAt     = DateTime.UtcNow,
            Status         = "enrolled",
            PaymentChoice  = 0
        };

        _db.EnrollmentLists.Add(enrollment);

        try
        {
            await _db.SaveChangesAsync(ct);
        }
        catch (DbUpdateException)
        {
            return EnrollmentResult.Fail(EnrollmentOutcome.AlreadyEnrolled, "Enrollment already exists or email already registered.");
        }
        _ = Task.Run(async () =>
        {
            Console.WriteLine("DEBUG: Task.Run started");
            try
            {
                try
            {
                // Use CancellationToken.None so it still runs even if the HTTP request is aborted
                await SendEnrollmentEmailAsync(user, course, CancellationToken.None);
            }
            catch (Exception ex)
            {
                // TODO: inject ILogger<CourseEnrollmentService> and log this instead of Console
                Console.WriteLine($"[Email] Failed to send enrollment email to {user.Email}: {ex}");
            }

            if (isNewUser)
            {
                try
                {
                    await grClient.AddContactAsync(
                        user.Email,
                        user.FirstName + user.LastName,
                        CancellationToken.None);
                }
                catch (Exception ex)
                {
                    // Same here: log instead of crashing the process
                    Console.WriteLine($"[GetResponse] Failed to add contact {user.Email}: {ex}");
                }
            }

            }
            catch (Exception ex)
            {
                Console.WriteLine("OUTER TASK ERROR: " + ex);
            }
        });
        // 8) Send confirmation email after commit
        // await SendEnrollmentEmailAsync(user, course, ct);
        // if (isNewUser)
        // {
        //     await grClient.AddContactAsync(user.Email, user.FirstName + user.LastName, ct);
        // }        
        return EnrollmentResult.Ok(enrollment.Id);
    }

    public async Task<EnrollmentResult> EnrollPaidAsync(
        int courseId,
        PaidCourseFormDto form,
        CancellationToken ct = default)
        {
            // 1) Basic validation
            if (string.IsNullOrWhiteSpace(form.Email) ||
                string.IsNullOrWhiteSpace(form.FirstName) ||
                string.IsNullOrWhiteSpace(form.LastName))
            {
                return EnrollmentResult.Fail(EnrollmentOutcome.InvalidInput, "Missing required fields.");
            }

            if (form.PaymentChoice is < 1 or > 3)
            {
                return EnrollmentResult.Fail(EnrollmentOutcome.InvalidPaymentChoice, "PaymentChoice must be 1, 2 or 3.");
            }

            var email = form.Email.Trim().ToLowerInvariant();

            // 2) Load course
            var course = await _db.Courses.AsNoTracking().FirstOrDefaultAsync(c => c.Id == courseId, ct);
            if (course is null) return EnrollmentResult.Fail(EnrollmentOutcome.CourseNotFound, "Course not found.");
            if (course.IsFree) return EnrollmentResult.Fail(EnrollmentOutcome.NotPaidCourse, "This endpoint enrolls paid courses.");

            // 3) Early price window check (PaymentChoice=1 requires EnrolledAt < EarlierDate)
            var now = DateTime.UtcNow;
            if (form.PaymentChoice == 1 && now >= course.EarlierDate)
            {
                return EnrollmentResult.Fail(EnrollmentOutcome.EarlyWindowClosed, "Early payment window is closed.");
            }

            // 4) Get or create user
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email, ct);
            if (user is null)
            {
                user = new User
                {
                    Email = email,
                    FirstName = form.FirstName?.Trim(),
                    LastName = form.LastName?.Trim()
                };
                await _db.Users.AddAsync(user, ct);
            }
            else
            {
                if (string.IsNullOrWhiteSpace(user.FirstName) && !string.IsNullOrWhiteSpace(form.FirstName))
                    user.FirstName = form.FirstName.Trim();
                if (string.IsNullOrWhiteSpace(user.LastName) && !string.IsNullOrWhiteSpace(form.LastName))
                    user.LastName = form.LastName.Trim();
            }

            // 5) Capacity check (reserve a seat for pending/enrolled; exclude cancelled)
            var activeCount = await _db.EnrollmentLists
                .CountAsync(e => e.CourseId == courseId && e.Status != "cancelled", ct);
            if (activeCount >= course.NrOfSeats)
                return EnrollmentResult.Fail(EnrollmentOutcome.CourseFull, "No seats available.");

            // 6) Duplicate enrollment check (email-based, avoids new user Id race)
            var alreadyEnrolled = await _db.EnrollmentLists
                .Include(e => e.User)
                .AnyAsync(e => e.CourseId == courseId &&
                            e.Status != "cancelled" &&
                            e.User.Email == email, ct);
            if (alreadyEnrolled)
                return EnrollmentResult.Fail(EnrollmentOutcome.AlreadyEnrolled, "User already enrolled for this course.");

            // 7) Build JSON form answers
            var answers = new Dictionary<string, object?>
            {
                ["firstName"] = form.FirstName,
                ["lastName"] = form.LastName,
                ["email"] = email,
                ["phoneNumber"] = form.PhoneNumber,
                ["participationChoice"] = form.ParticipationChoice,
                ["courseSource"] = form.CourseSource,
                ["paymentChoice"] = form.PaymentChoice
            };
            var answersJson = JsonSerializer.Serialize(answers);

            // 8) Create enrollment with Status=pending (admin flips to enrolled after payment)
            var enrollment = new EnrollmentList
            {
                User = user,
                CourseId = courseId,
                FormAnswersJson = answersJson,
                EnrolledAt = now,
                Status = "pending",
                PaymentChoice = form.PaymentChoice
            };

            _db.EnrollmentLists.Add(enrollment);

            try
            {
                await _db.SaveChangesAsync(ct);
            }
            catch (DbUpdateException)
            {
                return EnrollmentResult.Fail(EnrollmentOutcome.AlreadyEnrolled, "Enrollment already exists or email already registered.");
            }

            // 9) Send "pending payment" email (instructions)
            await SendPaidPendingEmailAsync(user, course, form.PaymentChoice, ct);

            return EnrollmentResult.Ok(enrollment.Id);
        }

    private async Task SendPaidPendingEmailAsync(User user, Course course, int paymentChoice, CancellationToken ct)
    {
        var subject = $"Inscriere inregistrata (in asteptarea platii) — {course.Title}";
        var paymentNote = paymentChoice switch
        {
            1 => $"Ai ales optiunea ‘plata inainte de {course.EarlierDate:yyyy-MM-dd}’.",
            2 => $"Ai ales optiunea ‘plata pana la data de start {course.StartDate:yyyy-MM-dd}’.",
            3 => "Ai ales optiunea ‘plata in rate’.",
            _ => ""
        };

        var body = $@"
Salut {user.FirstName ?? "acolo"},

Ti-am inregistrat inscrierea la ""{course.Title}"". Statusul tau este: PENDING (in asteptarea confirmarii platii).
{paymentNote}

Dupa ce primim confirmarea platii, iti vom trimite un email de confirmare (status ENROLLED).
Daca nu ai initiat aceasta inscriere, te rugam sa ne contactezi.

Echipa Aspiring Managers
";

        await _email.SendAsync(user.Email, subject, body, ct);
    }

    private async Task SendEnrollmentEmailAsync(User user, Course course, CancellationToken ct)
    {
        var subject = $"Felicitari! Te-ai inscris la {course.Title}";
        var body = $@"
Salut {user.FirstName ?? "acolo"},

Felicitari! Esti inscris cu succes la cursul ""{course.Title}"".
Data de start: {course.StartDate:yyyy-MM-dd}

Ne vedem la curs!
Echipa Aspiring Managers
";
        await _email.SendAsync(user.Email, subject, body, ct);
    }
}
