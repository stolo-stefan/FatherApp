using backend.Data;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.DTOs.AdminDtos;

public class AdminConverters
{
    public static async Task<User?> CreateDtoToUserEntityAsync(CreateAdminDto dto, EntityContext dbContext)
    {
        var normalized = dto.Email.Trim().ToLowerInvariant();
        var exists = await dbContext.Users.AsNoTracking()
            .AnyAsync(u => u.Email.ToLower() == normalized);
        if (exists)
            return null;

        var newUser = new User()
        {
            AdminPassword = dto.AdminPassword,
            FirstName = dto.FirstName,
            LastName = dto.LastName
        };
        if (!string.IsNullOrWhiteSpace(dto.Email))
            newUser.Email = dto.Email;

        return newUser;
    }

    public static ReadAdminDto EntityToReadDto(User user)
    {
        ReadAdminDto readAdminDto = new(
            user.Id,
            user.Email,
            user.FirstName,
            user.LastName
        );
        return readAdminDto;
    }
}
