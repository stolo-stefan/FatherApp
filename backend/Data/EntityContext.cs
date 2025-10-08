using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class EntityContext(DbContextOptions<EntityContext> options) 
    : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Blog> Blogs => Set<Blog>();
    public DbSet<Course> Courses => Set<Course>();
}
