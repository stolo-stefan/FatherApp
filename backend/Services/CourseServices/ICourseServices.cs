using backend.Entities;

public interface ICourseService
{
    Task<CreateCourseResult> CreateCourse(CreateCourseDto dto);
    Task<ReadCourseDto?> ReadCourse(int id);
    Task<List<ReadCourseDto>> ReadAllCourses();
    Task<bool> UpdateCourse(int id, UpdateCourseDto dto);
    Task<bool> DeleteCourse(int id);
    Task<ReadCourseDto?> ReadMostRecentCourse();
    Task<ReadCourseWhatsappDto?> ReadThankYouCourse();
}