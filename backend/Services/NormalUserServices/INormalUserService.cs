using System;
using backend.DTOs.BlogDtos;
using backend.DTOs.NormalUserDtos;
using backend.Services.GetResponse;

namespace backend.Services.NormalUserServices;

public interface INormalUserService
{
    Task<bool> SubscribedToNewsLetter(NewsLetterSignUpDto dto, IGetResponseClient grClient);
    Task<List<ReadSummaryBlogDto>> ReadBlogSummaries();
}
