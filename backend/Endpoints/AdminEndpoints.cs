using backend.DTOs;
using backend.DTOs.AdminDtos;
using backend.Services.AdminServices;

namespace backend.Endpoints;

public static class AdminEndpoints
{
    public static IEndpointRouteBuilder MapAdminEndPoints(this IEndpointRouteBuilder app)
    {
        var adminGroup = app.MapGroup("/api/admin").WithTags("Admin").RequireAuthorization("AdminOnly");

        //Create admin
        adminGroup.MapPost("/create", async (CreateAdminDto dto, IAdminService service) =>
        {
            if (string.IsNullOrWhiteSpace(dto.Email))
                return Results.BadRequest(
                    new
                    {
                        message = "Email is required."
                    }
                );
            if (string.IsNullOrWhiteSpace(dto.Name))
                return Results.BadRequest(
                    new
                    {
                        message = "Name is required."
                    }
                );
            if (string.IsNullOrWhiteSpace(dto.AdminPassword))
                return Results.BadRequest(
                    new
                    {
                        message = "AdminPassword is required."
                    }
                );

            var created = await service.CreateAdminAsync(dto);

            if (created.Entity is null)
                return Results.Conflict(
                    new
                    {
                        message = created.Message
                    }
                );

            var readAdminDto = AdminConverters.EntityToReadDto(created.Entity);

            return Results.Created($"/api/admin/read/{created.Entity.Id}", readAdminDto);
        });

        //Read admin/s
        adminGroup.MapGet("/read/{id:int}", async (int id, IAdminService service) =>
        {
            var adminDto = await service.ReadAdminAsync(id);
            if (adminDto is null)
                return Results.NotFound(
                    new
                    {
                        message = "Invalid admin ID."
                    }
                );
            return Results.Ok(adminDto);
        });
        adminGroup.MapGet("/read", async (IAdminService service) =>
        {
            var admins = await service.ReadAdminsAsync();
            if (admins.Count == 0)
                return Results.NoContent();
            return Results.Ok(admins);
        });

        //Update admin email and names
        adminGroup.MapPut("/update/{id:int}", async (int id, UpdateAdminDto dto, IAdminService service) =>
        {
            if (await service.UpdateAdminAsync(id, dto) == false)
                return Results.NotFound(
                    new
                    {
                        message = "Invalid id or account number"
                    }
                );
            return Results.Ok(dto);
        });

        //Delete admin
        adminGroup.MapDelete("/delete/{id:int}", async (int id, IAdminService service) =>
        {
            var ok = await service.DeleteAdminAsync(id);
            return ok ? Results.NoContent() : Results.NotFound(new { message = "Invalid id or already deleted." });
        });

        //Enrollment

        adminGroup.MapGet("{courseId:int}/enrolled/{userId:int}", async (int courseId, int userId, IAdminService service) =>
        {
            var dto = await service.ReadEnrolledUserAsync(courseId, userId);
            if (dto is null) return Results.NotFound("An error occured");
            return Results.Ok(dto);
        });

        adminGroup.MapGet("{courseId:int}/enrolled", async (int courseId, IAdminService service) =>
        {
            var dtoList = await service.ReadEnrolledInCourse(courseId);
            if (dtoList.Count() == 0) return Results.NotFound("No users enrolled");
            return Results.Ok(dtoList);
        });

        adminGroup.MapPost("/enrolled", async (EnrolledPaymentUpdate dto, IAdminService service) =>
        {
            var ok = await service.UpdatePaymentStatus(dto);
            if (!ok) return Results.BadRequest("An error occured");
            return Results.Ok("Status updated");
        });

        return adminGroup;
    }
}
