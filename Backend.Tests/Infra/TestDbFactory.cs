using backend.Data;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace Backend.Tests.Infra;

public static class TestDbFactory
{
    public static (EntityContext Ctx, SqliteConnection Conn) CreateSqliteInMemoryContext()
    {
        // One open connection keeps the in-memory DB alive for the test's lifetime
        var conn = new SqliteConnection("DataSource=:memory:");
        conn.Open();

        var options = new DbContextOptionsBuilder<EntityContext>()
            .UseSqlite(conn)
            .EnableSensitiveDataLogging()
            .Options;

        var ctx = new EntityContext(options);
        ctx.Database.EnsureCreated(); // build schema from your model

        return (ctx, conn);
    }
}
