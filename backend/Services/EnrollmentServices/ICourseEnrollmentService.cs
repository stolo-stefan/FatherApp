using backend.Services.GetResponse;

public interface ICourseEnrollmentService
{
    Task<EnrollmentResult> EnrollFreeAsync(
        int courseId,
        IGetResponseClient grClient,
        FreeCourseFormDto form,
        CancellationToken ct = default);

    Task<EnrollmentResult> EnrollPaidAsync(
        int courseId,
        PaidCourseFormDto form,
        CancellationToken ct = default);

}
