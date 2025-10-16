using System;
using backend.Data;
using backend.DTOs.NormalUserDtos;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.NormalUserServices;

public class NormalUserService : INormalUserService
{
    private readonly EntityContext dbContext;
    public NormalUserService(EntityContext db) => dbContext = db;
    public async Task<bool> SubscribedToNewsLetter(NewsLetterSignUpDto dto)
    {
        if (await dbContext.Users.AnyAsync(u => u.Email == dto.Email && u.IsNewsLetterSub == true))
            return false;

        // Try to find existing user
        var exists = await dbContext.Users
            .FirstOrDefaultAsync(u => u.Email.ToLower() == dto.Email.ToLower());

        if (exists != null)
        {
            // Found user → mark subscribed
            if (exists.IsNewsLetterSub == false)
                exists.IsNewsLetterSub = true;
        }
        else
        {
            // Not found → create new
            exists = new User()
            {
                Email = dto.Email,
                IsNewsLetterSub = true
            };
            await dbContext.Users.AddAsync(exists);
        }

        await dbContext.SaveChangesAsync();
        return true;
    }
}

