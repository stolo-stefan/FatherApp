using backend.Endpoints;
using backend.Services;
using backend.Services.Email;
using backend.Services.Infrastructure;
using backend.Services.StorageServices;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.Extensions.Options;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Entities;
using backend.Services.GetResponse;

var builder = WebApplication.CreateBuilder(args);



// Infra: DB + JWT + auth policies
builder.Services.AddInfrastructure(builder.Configuration);

// Bind Smtp settings
builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("Smtp"));

// Email services
builder.Services.AddSingleton<IEmailSender, MailKitEmailSender>();
builder.Services.AddSingleton<IEmailQueue, ChannelEmailQueue>();
builder.Services.AddHostedService(sp => (ChannelEmailQueue)sp.GetRequiredService<IEmailQueue>());
builder.Services.AddHttpClient<IGetResponseClient, GetResponseClient>();
builder.Logging.AddConsole();


// Domain services + media policy + (optional) upload limits override
builder.Services.AddAppServices(opts =>
{
    // Example: tweak if needed
    // opts.MaxImageBytes = 15L * 1024 * 1024;
    // opts.MaxVideoBytes = 800L * 1024 * 1024;
});

builder.Services.AddHttpLogging(o =>
{
    o.LoggingFields =
        HttpLoggingFields.RequestMethod |
        HttpLoggingFields.RequestPath |
        HttpLoggingFields.ResponseStatusCode |
        HttpLoggingFields.Duration |
        HttpLoggingFields.RequestHeaders;

    // Log specific headers that help identify frontend requests
    o.RequestHeaders.Add("User-Agent");
    o.RequestHeaders.Add("Origin");
    o.RequestHeaders.Add("Referer");
});

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("Frontend", p =>
        p.SetIsOriginAllowed(origin =>
        {
            var host = new Uri(origin).Host;
            return host == "father-app-three.vercel.app"
                || host.EndsWith(".vercel.app") // previews (optional)
                || host == "localhost"
                || host == "127.0.0.1"
                || host == "www.aspiringmanagers.ro";
        
        })
        .AllowAnyHeader()
        .AllowAnyMethod()
    // .AllowCredentials()   // enable only if you use cookies
    );
});

// var blobConn   = builder.Configuration.GetConnectionString("AzureBlob") ?? throw new InvalidOperationException("ConnectionStrings:AzureBlob is missing.");
// var container  = builder.Configuration.GetValue<string>("Storage:Container") ?? "media";
// var useSas     = builder.Configuration.GetValue<bool>("Storage:UseSasLinks", true);
// var sasHours   = builder.Configuration.GetValue<int?>("Storage:SasTtlHours") ?? 6;

// builder.Services.AddSingleton<IStorageServices>(
//     _ => new AzureBlobStorageServices(blobConn, container, useSasLinks: useSas, sasTtl: TimeSpan.FromHours(sasHours))
// );
builder.Services.AddSingleton<IStorageServices, NullStorageServices>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<EntityContext>();

    var pending = await db.Database.GetPendingMigrationsAsync();
    if (pending.Any())
        await db.Database.MigrateAsync();
    else
        await db.Database.EnsureCreatedAsync(); // ok if you have no migrations yet
            var config = scope.ServiceProvider.GetRequiredService<IConfiguration>();
    var email = config["AdminSeed:Email"];
    var pwd   = config["AdminSeed:Password"];

    if (!string.IsNullOrWhiteSpace(email) && !string.IsNullOrWhiteSpace(pwd))
    {
        var norm = email.Trim().ToLowerInvariant();

        var exists = await db.Users
            .AnyAsync(u => u.Email.ToLower() == norm && u.Role.ToLower() == "admin");

        if (!exists)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(pwd);
            db.Users.Add(new User
            {
                Email = email.Trim(),
                Role = "admin",
                AdminPassword = hash
            });
            await db.SaveChangesAsync();
            Console.WriteLine($"[Seed] Admin created: {email}");
        }
        else
        {
            Console.WriteLine($"[Seed] Admin already exists: {email}");
        }
    }
    else
    {
        Console.WriteLine("[Seed] Skipped: AdminSeed:Email/Password not set.");
    }
}

var storage = app.Services.GetRequiredService<IStorageServices>();
Console.WriteLine($"[Storage DI] Using: {storage.GetType().FullName}");

app.UseRouting(); 
app.UseCors("Frontend");
app.UseHttpLogging();


// Static files if you serve media from wwwroot/uploads
//app.UseStaticFiles();

// Auth pipeline
app.UseAuthentication();
app.UseAuthorization();

// Endpoint groups
app.MapAdminEndPoints();
app.MapAdminAuthEndpoints();
app.MapBlogEndpoints();
app.MapMediaEndpoints();
app.MapNormalUserEndPoints();
app.MapAdminCourseEndpoints();
app.MapCourseEnrollment();

app.MapGet("/ping", (ILogger<Program> logger) =>
{
    logger.LogInformation("Ping endpoint hit at {utc}", DateTime.UtcNow);
    return Results.Ok("pong");
});

app.Run();
