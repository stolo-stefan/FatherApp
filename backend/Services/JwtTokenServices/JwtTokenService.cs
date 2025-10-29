using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.DTOs.AuthDtos;
using backend.Entities;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Logging;

namespace backend.Services.JwtTokenServices;

public sealed class JwtTokenService : IJwtTokenService
{
    private readonly JwtOptions jwtOptions;
    private readonly ILogger<JwtTokenService> logger;

    public JwtTokenService(JwtOptions options, ILogger<JwtTokenService> logger)
    {
        this.jwtOptions = options;
        this.logger = logger;
    }

    public (string token, DateTime expiresAt) CreateToken(User user, DateTime now)
    {
        try
        {
            if (user is null) throw new ArgumentNullException(nameof(user));
            if (string.IsNullOrWhiteSpace(user.Id.ToString()))
                throw new InvalidOperationException("User.Id is missing.");

            // ⚠️ Claim values must NOT be null/empty
            var email = user.Email;
            if (string.IsNullOrWhiteSpace(email))
                throw new InvalidOperationException("User.Email is null or empty when creating JWT.");

            // Key checks (extra defense, even if you already checked earlier)
            var keyStr = jwtOptions.Key ?? "";
            var keyBytes = Encoding.UTF8.GetBytes(keyStr);
            if (keyBytes.Length < 16)
                throw new InvalidOperationException("Jwt:Key is missing or too short (>=16 chars required).");

            var key = new SymmetricSecurityKey(keyBytes);
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expires = now.AddMinutes(jwtOptions.ExpiresMinutes);

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new(JwtRegisteredClaimNames.Email, email),
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Role, "admin"),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            // Allow empty issuer/audience (they’ll simply be omitted)
            var issuer   = string.IsNullOrWhiteSpace(jwtOptions.Issuer)   ? null : jwtOptions.Issuer;
            var audience = string.IsNullOrWhiteSpace(jwtOptions.Audience) ? null : jwtOptions.Audience;

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                notBefore: now,
                expires: expires,
                signingCredentials: credentials
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return (jwt, expires);
        }
        catch (Exception ex)
        {
            // 🔎 This will show up in Railway logs with full stack
            logger.LogError(ex, "JWT creation failed for user {UserId}", user?.Id);
            throw; // Let the endpoint catch it and return Problem()
        }
    }
}
