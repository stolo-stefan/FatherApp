using System;
using backend.DTOs.NormalUserDtos;

namespace backend.Services.NormalUserServices;

public interface INormalUserService
{
    Task<bool> SubscribedToNewsLetter(NewsLetterSignUpDto dto);
}
