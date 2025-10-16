using backend.Data;
using backend.DTOs;
using backend.DTOs.AdminDtos;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.AdminServices;

public class AdminService : IAdminService
{

    private readonly EntityContext dbContext;
    public AdminService(EntityContext db) => dbContext = db;

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
        if (!string.IsNullOrWhiteSpace(dto.FirstName))
            foundAdmin.FirstName = dto.FirstName;
        if (!string.IsNullOrWhiteSpace(dto.LastName))
            foundAdmin.LastName = dto.LastName;

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
    
    private static bool IsAdmin(User u)
        => string.Equals(u.Role, "admin", StringComparison.OrdinalIgnoreCase);
}
