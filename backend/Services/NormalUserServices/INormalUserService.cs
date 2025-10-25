using System;
using backend.DTOs.BlogDtos;
using backend.DTOs.NormalUserDtos;

namespace backend.Services.NormalUserServices;

public interface INormalUserService
{
    Task<bool> SubscribedToNewsLetter(NewsLetterSignUpDto dto);
    Task<List<ReadSummaryBlogDto>> ReadBlogSummaries();
}
