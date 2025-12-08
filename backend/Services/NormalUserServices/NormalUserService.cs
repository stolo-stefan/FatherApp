using System;
using backend.Data;
using backend.DTOs.BlogDtos;
using backend.DTOs.NormalUserDtos;
using backend.Entities;
using backend.Services.GetResponse;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.NormalUserServices;

public class NormalUserService : INormalUserService
{
    private readonly EntityContext dbContext;
    public NormalUserService(EntityContext db) => dbContext = db;
    public async Task<bool> SubscribedToNewsLetter(NewsLetterSignUpDto dto, IGetResponseClient grClient)
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

        try
        {
            await grClient.AddContactAsync(
                exists.Email,
                exists.Name == ""? exists.Name: "No name (from news-letter)",
                null,
                null,
                CancellationToken.None);
        }
        catch (Exception ex)
        {
            // Same here: log instead of crashing the process
            Console.WriteLine($"[GetResponse] Failed to add contact {exists.Email}: {ex}");
        }
            

        await dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<List<ReadSummaryBlogDto>> ReadBlogSummaries()
    {
        var blogs = await dbContext.Blogs
        .Where(b => b.IsVisible)
        .OrderByDescending(b => b.DatePosted)
        .Select(b => new ReadSummaryBlogDto(
            b.Id,
            b.Title,
            b.Content,
            b.DatePosted,
            b.Summary,
            b.IsVisible,
            b.Slug
        ))
        .ToListAsync();

        return blogs;
    }
}

