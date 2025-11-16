using backend.Services.GetResponse;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

public static class EnrollmentEndpoints
{
    public static RouteGroupBuilder MapCourseEnrollment(this IEndpointRouteBuilder app)
    {
        var grp = app.MapGroup("/api/courses");

        // POST /api/courses/{courseId}/enroll/free
        grp.MapPost("/{courseId:int}/enroll/free",
            async Task<Results<
                Ok<EnrollmentCreatedDto>,
                NotFound<string>,
                Conflict<string>,
                BadRequest<string>>> (
                [FromRoute] int courseId,
                [FromBody] FreeCourseFormDto form,
                ICourseEnrollmentService svc,
                CancellationToken ct,
                IGetResponseClient grClient) =>
            {
                var res = await svc.EnrollFreeAsync(courseId, grClient, form, ct);

                return res.Outcome switch
                {
                    EnrollmentOutcome.Ok => TypedResults.Ok(new EnrollmentCreatedDto(res.EnrollmentId)),
                    EnrollmentOutcome.CourseNotFound => TypedResults.NotFound("Course not found."),
                    EnrollmentOutcome.AlreadyEnrolled => TypedResults.Conflict("Already enrolled."),
                    EnrollmentOutcome.CourseFull => TypedResults.Conflict("Course is full."),
                    EnrollmentOutcome.NotFreeCourse => TypedResults.BadRequest("This endpoint enrolls only free courses."),
                    EnrollmentOutcome.InvalidInput => TypedResults.BadRequest(res.Message ?? "Invalid input."),
                    _ => TypedResults.BadRequest("Could not enroll.")
                };
            })
        .Produces<EnrollmentCreatedDto>(StatusCodes.Status200OK)
        .Produces<string>(StatusCodes.Status404NotFound)
        .Produces<string>(StatusCodes.Status409Conflict)
        .Produces<string>(StatusCodes.Status400BadRequest);

        grp.MapPost("/{courseId:int}/enroll/paid",
        async Task<Results<
            Ok<EnrollmentCreatedDto>,
            NotFound<string>,
            Conflict<string>,
            BadRequest<string>>> (
            [FromRoute] int courseId,
            [FromBody]  PaidCourseFormDto form,
            ICourseEnrollmentService svc,
            CancellationToken ct) =>
            {
                var res = await svc.EnrollPaidAsync(courseId, form, ct);

                return res.Outcome switch
                {
                    EnrollmentOutcome.Ok               => TypedResults.Ok(new EnrollmentCreatedDto(res.EnrollmentId, "pending")),
                    EnrollmentOutcome.CourseNotFound   => TypedResults.NotFound("Course not found."),
                    EnrollmentOutcome.AlreadyEnrolled  => TypedResults.Conflict("Already enrolled."),
                    EnrollmentOutcome.CourseFull       => TypedResults.Conflict("Course is full."),
                    EnrollmentOutcome.NotPaidCourse    => TypedResults.BadRequest("This endpoint is for paid courses only."),
                    EnrollmentOutcome.InvalidPaymentChoice => TypedResults.BadRequest("PaymentChoice must be 1, 2 or 3."),
                    EnrollmentOutcome.EarlyWindowClosed    => TypedResults.BadRequest("Early payment window is closed."),
                    _                                    => TypedResults.BadRequest("Invalid input.")
                };
            })
        .Produces<EnrollmentCreatedDto>(StatusCodes.Status200OK)
        .Produces<string>(StatusCodes.Status404NotFound)
        .Produces<string>(StatusCodes.Status409Conflict)
        .Produces<string>(StatusCodes.Status400BadRequest);

        return grp;
    }

}