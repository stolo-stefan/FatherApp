namespace backend.DTOs.AuthDtos;

public sealed record JwtOptions
{
    public string Issuer { get; init; } = "";
    public string Audience { get; init; } = "";
    public string Key { get; init; } = "";
    public int ExpiresMinutes { get; init; } = 60;
}