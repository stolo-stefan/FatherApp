using backend.DTOs;
using backend.DTOs.AdminDtos;

namespace backend.Services.AdminServices;

public interface IAdminService
{
    //ADMIN - CRUD template

    //Create admin
    Task<CreateAdminResult> CreateAdminAsync(CreateAdminDto dto);

    //Read admin/s 
    Task<ReadAdminDto?> ReadAdminAsync(int id);
    Task<List<ReadAdminDto>> ReadAdminsAsync();

    //Update admin
    Task<bool> UpdateAdminAsync(int id, UpdateAdminDto dto);
    //bool UpdateAdminPassword(int id, UpdateAdminPasswordDto dto);

    //Delete admin
    Task<bool> DeleteAdminAsync(int id);
}
