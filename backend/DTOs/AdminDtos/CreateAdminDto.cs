namespace backend.DTOs;

public record class CreateAdminDto(
    string Email,
    string FirstName,
    string LastName,
    string AdminPassword
);