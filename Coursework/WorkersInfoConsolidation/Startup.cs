using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WorkersInfoConsolidation.Models;
using Microsoft.EntityFrameworkCore;
using WorkersInfoConsolidation.Services;
using WorkersInfoConsolidation.Mappers;
using AutoMapper;

namespace WorkersInfoConsolidation
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<WorkersDbContext>(options => options.UseSqlServer(connectionString));
            
            services.AddScoped<IWorkersService, WorkersService>();
            
            var mapConfig = new MapperConfiguration(mapCfg =>
            {
                mapCfg.AddProfile(new MappingProfile());
            });
            IMapper mapper = mapConfig.CreateMapper();
            services.AddSingleton(mapper);
            
            services.AddCors();

            services.AddControllersWithViews();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseStaticFiles();

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
                //.AllowCredentials());


            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
            
        }
        
    }
}