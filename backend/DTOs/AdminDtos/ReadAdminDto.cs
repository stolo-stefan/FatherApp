namespace backend.DTOs;

public record class ReadAdminDto(
    int Id,
    string Email,
    string Name
);