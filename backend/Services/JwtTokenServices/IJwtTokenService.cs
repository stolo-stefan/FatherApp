using backend.Entities;

namespace backend.Services.JwtTokenServices;

public interface IJwtTokenService
{
    (string token, DateTime expiresAt) CreateToken(User user, DateTime now);
}
