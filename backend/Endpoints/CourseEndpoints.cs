using backend.Services.CourseServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;

public static class AdminCourseEndpoints
{
    public static RouteGroupBuilder MapAdminCourseEndpoints(this IEndpointRouteBuilder app)
    {
        var grp = app.MapGroup("/api/courses")
                     .RequireAuthorization("AdminOnly"); // adapt to your policy/role

        grp.MapPost("/", async Task<Results<Created<ReadCourseDto>, BadRequest<string>>>
        (CreateCourseDto dto, ICourseService svc) =>
        {
            var res = await svc.CreateCourse(dto);
            if (!res.Success || res.Entity is null) return TypedResults.BadRequest(res.Message);

            // project entity to ReadCourseDto inline (no mapper)
            var c = res.Entity;
            var read = new ReadCourseDto(
                c.Id, c.Title, c.Description, c.StartDate, c.EarlierDate, c.NrOfSeats, c.IsFree, c.Currency, c.PriceInCents);

            return TypedResults.Created($"/api/courses/{read.Id}", read);
        });

        grp.MapGet("/{id:int}", async Task<Results<Ok<ReadCourseDto>, NotFound>>
        (int id, ICourseService svc) =>
        {
            var dto = await svc.ReadCourse(id);
            return dto is null ? TypedResults.NotFound() : TypedResults.Ok(dto);
        });

        grp.MapGet("/", async Task<Ok<List<ReadCourseDto>>> (ICourseService svc) =>
        {
            var items = await svc.ReadAllCourses();
            return TypedResults.Ok(items);
        });

        grp.MapPatch("/{id:int}", async Task<Results<Ok, NotFound, BadRequest<string>>>
        (int id, UpdateCourseDto dto, ICourseService svc) =>
        {
            var ok = await svc.UpdateCourse(id, dto);
            if (!ok)
            {
                // You can refine messages by improving UpdateCourse return type if needed
                // For now, return 404 if not found else 400 for invalid/duplicate state
                var exists = await svc.ReadCourse(id);
                return exists is null ? TypedResults.NotFound() : TypedResults.BadRequest("Invalid update.");
            }
            return TypedResults.Ok();
        });

        grp.MapDelete("/{id:int}", async Task<Results<NoContent, NotFound>>
        (int id, ICourseService svc) =>
        {
            var ok = await svc.DeleteCourse(id);
            return ok ? TypedResults.NoContent() : TypedResults.NotFound();
        });

        return grp;
    }
}
