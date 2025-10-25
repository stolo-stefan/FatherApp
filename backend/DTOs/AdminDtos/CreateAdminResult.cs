using backend.Entities;

namespace backend.DTOs.AdminDtos;

public record class CreateAdminResult(
    bool Success,
    string Message,
    User? Entity
);