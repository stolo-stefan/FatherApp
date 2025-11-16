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
    public DbSet<EnrollmentList> EnrollmentLists => Set<EnrollmentList>();
    
    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<Blog>()
            .HasMany(x => x.Media)
            .WithOne(m => m.Blog)
            .HasForeignKey(m => m.BlogId)
            .OnDelete(DeleteBehavior.Cascade);

        b.Entity<EnrollmentList>(e =>
        {
            // Prevent duplicate enrollments
            e.HasIndex(x => new { x.UserId, x.CourseId }).IsUnique();

            e.Property(x => x.FormAnswersJson)
                .HasColumnType("json");

            e.HasOne(x => x.User)
                .WithMany(u => u.Enrollments)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            e.HasOne(x => x.Course)
                .WithMany(c => c.Enrollments)
                .HasForeignKey(x => x.CourseId)
                .OnDelete(DeleteBehavior.Cascade);
        });
        base.OnModelCreating(b);
    }
}
