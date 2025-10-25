namespace backend.DTOs.AuthDtos;

public record class LogInRequestDto(
    string Email,
    string Password
);

public record class LogInResponseDto(
    string Token,
    DateTime ExpiresAt
);
