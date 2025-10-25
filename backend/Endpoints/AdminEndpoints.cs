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
            if (string.IsNullOrWhiteSpace(dto.FirstName))
                return Results.BadRequest(
                    new
                    {
                        message = "FirstName is required."
                    }
                );
            if (string.IsNullOrWhiteSpace(dto.LastName))
                return Results.BadRequest(
                    new
                    {
                        message = "LastName is required."
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

        return adminGroup;
    }
}
