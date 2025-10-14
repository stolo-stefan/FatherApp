using backend.Endpoints;
using backend.Services;
using backend.Services.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Infra: DB + JWT + auth policies
builder.Services.AddInfrastructure(builder.Configuration);

// Domain services + media policy + (optional) upload limits override
builder.Services.AddAppServices(opts =>
{
    // Example: tweak if needed
    // opts.MaxImageBytes = 15L * 1024 * 1024;
    // opts.MaxVideoBytes = 800L * 1024 * 1024;
});

var app = builder.Build();

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

app.Run();
