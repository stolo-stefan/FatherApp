using backend.Endpoints;
using backend.Services;
using backend.Services.Email;
using backend.Services.Infrastructure;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Infra: DB + JWT + auth policies
builder.Services.AddInfrastructure(builder.Configuration);

// Bind Smtp settings
builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("Smtp"));

// Email services
builder.Services.AddSingleton<IEmailSender, MailKitEmailSender>();
builder.Services.AddSingleton<IEmailQueue, ChannelEmailQueue>();
builder.Services.AddHostedService(sp => (ChannelEmailQueue)sp.GetRequiredService<IEmailQueue>());



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
    opt.AddPolicy("Frontend", policy =>
        policy.WithOrigins(
                "http://localhost:5173",   // Vite dev
                "http://127.0.0.1:5173",
                "https://your-frontend-domain.com" // add prod later
            )
            .AllowAnyHeader()
            .AllowAnyMethod()   // includes OPTIONS
            .AllowCredentials() // only if you use cookies/auth
    );
});

var app = builder.Build();

var smtp = app.Services.GetRequiredService<IOptions<SmtpSettings>>().Value;
Console.WriteLine($"[SMTP] Host={smtp.Host} Port={smtp.Port} UseSsl={smtp.UseSsl} From={smtp.FromEmail} Username={smtp.Username} PwdLen={smtp.Password?.Length ?? 0}");


app.UseHttpLogging();
app.UseCors("Frontend");

// Static files if you serve media from wwwroot/uploads
app.UseStaticFiles();

// Auth pipeline
app.UseAuthentication();
app.UseAuthorization();

// Endpoint groups
app.MapAdminEndPoints();
app.MapAdminAuthEndpoints();
app.MapBlogEndpoints();
app.MapMediaEndpoints();
app.MapNormalUserEndPoints();

app.MapGet("/ping", (ILogger<Program> logger) =>
{
    logger.LogInformation("Ping endpoint hit at {utc}", DateTime.UtcNow);
    return Results.Ok("pong");
});

app.Run();
