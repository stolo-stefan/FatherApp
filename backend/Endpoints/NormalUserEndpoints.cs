using System;
using backend.DTOs.NormalUserDtos;
using backend.Services.NormalUserServices;

namespace backend.Endpoints;

public static class NormalUserEndpoints
{
    public static IEndpointRouteBuilder MapNormalUserEndPoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/user");

        //User signs-up for newsletter
        group.MapPost("/sign-up", async (NewsLetterSignUpDto dto, INormalUserService service) =>
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Email))
                return Results.BadRequest("An email must be provided");
            var resp = await service.SubscribedToNewsLetter(dto);
            if (resp == false)
                return Results.BadRequest("Already applied to the news - letter");
            
            return Results.Ok();
        });

        return group;
    }
}
