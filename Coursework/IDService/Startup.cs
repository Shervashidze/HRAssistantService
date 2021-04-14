using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WorkersInfoConsolidation.Models;
using Microsoft.EntityFrameworkCore;
using WorkersInfoConsolidation.Services;
using WorkersInfoConsolidation.Mappers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
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
            
            services.AddScoped<IWorkersService, WorkersService>();

            //var securityKey =
            //    new SymmetricSecurityKey(
            //        Encoding.ASCII.GetBytes(
            //            "U8_.wpvk93fPWG<f2$Op[vwegmQGF25_fNG2V0ijnm2e0igv24g"));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false; //TODO: dev env setting
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidIssuer = "AuthService",
                        ValidateIssuer = true,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        //IssuerSigningKey = securityKey,
                        ValidateIssuerSigningKey = true
                    };
                });

            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<WorkersDbContext>(options => options.UseSqlServer(connectionString));
            services.AddDbContext<IdentityContext>(options => options.UseSqlServer(connectionString));

            services.AddIdentity<Worker, IdentityRole>(opts =>
            {
                opts.User.RequireUniqueEmail = true;
                opts.Password.RequiredLength = 6;
                opts.Password.RequireNonAlphanumeric = false;
                opts.Password.RequireLowercase = false;
                opts.Password.RequireUppercase = false;
                opts.Password.RequireDigit = false;
            })
                .AddEntityFrameworkStores<IdentityContext>()
                .AddUserManager<UserManager<Worker>>()
                .AddRoleManager<RoleManager<IdentityRole>>()
                .AddDefaultTokenProviders();

            services.AddScoped<ITokenService, TokenService>()
                .AddScoped<IAccountService, AccountService>()
                .AddScoped<IUserManager, ProxyUserManager>();

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
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            using (var scope = app.ApplicationServices.CreateScope())
            {
                var userManager = scope.ServiceProvider.GetService(typeof(UserManager<Worker>)) as UserManager<Worker>;
                var rolesManager =
                    scope.ServiceProvider.GetService(typeof(RoleManager<IdentityRole>)) as RoleManager<IdentityRole>;
                
                RoleInitializer.InitializeAsync(userManager, rolesManager).Wait();
            }

            app.UseCors(builder =>builder
                .WithOrigins("http://localhost:3000") // I allow it to call api from server where react runs
                .WithOrigins("http://localhost:7000") // I allow it to call api from server where react runs
                .AllowAnyMethod()
                .AllowCredentials());
            
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