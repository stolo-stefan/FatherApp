namespace backend.DTOs;

public record class CreateAdminDto(
    string Email,
    string Name,
    string AdminPassword
);