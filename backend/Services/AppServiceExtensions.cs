using System;
using backend.Services.AdminServices;
using backend.Services.BlogServices;
using backend.Services.CourseServices;
using backend.Services.MediaServices;
using backend.Services.NormalUserServices;
using backend.Services.StorageServices;
using Microsoft.AspNetCore.Http.Features;

namespace backend.Services;

public static class AppServiceExtensions
{
    public static IServiceCollection AddAppServices(this IServiceCollection services, Action<MediaOptions>? configureMedia = null)
    {
        // Central media policy (allowed types, size caps)
        var mediaOpts = new MediaOptions();
        configureMedia?.Invoke(mediaOpts);
        services.AddSingleton(mediaOpts);

        // File upload limits (only if you handle media)
        services.Configure<FormOptions>(o =>
        {
            o.MultipartBodyLengthLimit = 600L * 1024L * 1024L; // 600 MB
        });

        // Storage: local volume on Railway
        //services.AddSingleton<IStorageServices, StorageService>();

        // Domain services
        services.AddScoped<IAdminService, AdminService>();
        services.AddScoped<IBlogService, BlogService>();
        services.AddScoped<IMediaService, MediaService>();
        services.AddScoped<INormalUserService, NormalUserService>();
        services.AddScoped<ICourseService, CourseService>();
        services.AddScoped<ICourseEnrollmentService, CourseEnrollmentService>();


        return services;
    }
}
