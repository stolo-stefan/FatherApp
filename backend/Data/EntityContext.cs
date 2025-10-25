using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class EntityContext(DbContextOptions<EntityContext> options)
    : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Blog> Blogs => Set<Blog>();
    public DbSet<Media> Medias => Set<Media>();
    public DbSet<Course> Courses => Set<Course>();
    
    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<Blog>()
            .HasMany(x => x.Media)
            .WithOne(m => m.Blog)
            .HasForeignKey(m => m.BlogId)
            .OnDelete(DeleteBehavior.Cascade);

        base.OnModelCreating(b);
    }
}
