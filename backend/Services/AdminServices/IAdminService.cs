using backend.DTOs;

namespace backend.Services.AdminServices;

public interface IAdminService
{
    //ADMIN - CRUD template

    //Create admin
    ReadAdminDto CreateAdmin(CreateAdminDto dto);

    //Read admin/s 
    ReadAdminDto? ReadAdmin(int id);
    List<ReadAdminDto> ReadAdmins();

    //Update admin
    bool UpdateAdmin(int id, UpdateAdminDto dto);
    //bool UpdateAdminPassword(int id, UpdateAdminPasswordDto dto);

    //Delete admin
    bool DeleteAdmin(int id);
}
