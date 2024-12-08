namespace FezWebSiteApi
{
    using FezWebSiteApi.Pictures;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection.Extensions;
    using Microsoft.OpenApi.Models;

    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<AppSettings>(Configuration.GetSection("appSettings.json"));
            var appSettings = Configuration.Get<AppSettings>()!;

            services.TryAddSingleton(appSettings);
            services.TryAddScoped<IPictureService, PictureService>();
            services.TryAddScoped<IPictureRepository, PictureRepository>();

            // CORS Configuration to allow requests from your React frontend
            services.AddCors(options =>
            {
                options.AddPolicy("AllowReactFrontend", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Image API",
                    Description = "Image API swagger page",
                });
            });
            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (!env.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();  // Enable static file serving from wwwroot

            app.UseRouting();

            // Enable CORS to allow React frontend to make requests
            app.UseCors("AllowReactFrontend");

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Image API v1");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
