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
    public CreateAdminResult CreateAdmin(CreateAdminDto dto)
    {
        var newUser = AdminConverters.CreateDtoToUserEntity(dto, dbContext);
        if (newUser == null)
            return new CreateAdminResult(
                false,
                "Admin with same email already exists",
                null
            );

        newUser.Role = "admin";
        newUser.AdminPassword = BCrypt.Net.BCrypt.HashPassword(dto.AdminPassword);

        dbContext.Users.Add(newUser);
        dbContext.SaveChanges();

        return new CreateAdminResult(
            true,
            "Created successfully",
            newUser
        );
    }

    //Read admin/s
    public ReadAdminDto? ReadAdmin(int id)
    {
        var foundUser = dbContext.Users.AsNoTracking().FirstOrDefault(u => u.Id == id && u.Role == "admin");

        return foundUser is null ? null : AdminConverters.EntityToReadDto(foundUser);
    }
    public List<ReadAdminDto> ReadAdmins()
    {
        return dbContext.Users
        .AsNoTracking()
        .Where(u => u.Role == "admin")
        .Select(u => AdminConverters.EntityToReadDto(u))
        .ToList();
    }

    //Update admin
    public bool UpdateAdmin(int id, UpdateAdminDto dto)
    {
        var foundAdmin = dbContext.Users.Find(id);
        if (foundAdmin is null || !IsAdmin(foundAdmin)) return false;

        if (!string.IsNullOrWhiteSpace(dto.Email))
            foundAdmin.Email = dto.Email;
        if (!string.IsNullOrWhiteSpace(dto.FirstName))
            foundAdmin.FirstName = dto.FirstName;
        if (!string.IsNullOrWhiteSpace(dto.LastName))
            foundAdmin.LastName = dto.LastName;

        dbContext.SaveChanges();

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
    public bool DeleteAdmin(int id)
    {
        var foundAdmin = dbContext.Users.Find(id);
        if (foundAdmin is null || !IsAdmin(foundAdmin)) return false;

        dbContext.Users.Remove(foundAdmin);
        dbContext.SaveChanges();

        return true;
    }
    
    private static bool IsAdmin(User u)
        => string.Equals(u.Role, "admin", StringComparison.OrdinalIgnoreCase);
}
