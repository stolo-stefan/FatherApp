using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.DTOs.AuthDtos;
using backend.Entities;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services.JwtTokenServices;

public sealed class JwtTokenService(JwtOptions options) : IJwtTokenService
{
    private readonly JwtOptions jwtOptions = options;
    public (string token, DateTime expiresAt) CreateToken(User user, DateTime now)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Key));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var expires = now.AddMinutes(jwtOptions.ExpiresMinutes);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Role, "admin"),                 // role claim for policy
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) // for revocation/blacklist
        };

        var token = new JwtSecurityToken(
            issuer: jwtOptions.Issuer,
            audience: jwtOptions.Audience,
            claims: claims,
            notBefore: now,
            expires: expires,
            signingCredentials: credentials
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        return (jwt, expires);

    }
}
