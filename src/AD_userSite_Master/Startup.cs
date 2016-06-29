using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AD_userSite_Master.ServerSide._00_CommonUtility.I_Contracts;
using AD_userSite_Master.ServerSide._00_CommonUtility.I_Contracts.IRepo;
using AD_userSite_Master.ServerSide._00_CommonUtility.I_Contracts.ISevices;
using AD_userSite_Master.ServerSide._01_DataAccess;
using AD_userSite_Master.ServerSide._01_DataAccess.Repo;
using AD_userSite_Master.ServerSide._02_BusinessLogic.ServicesManager;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;

namespace AD_userSite_Master
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddJsonFile("config.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IUoW, UoW>();
            services.AddScoped<IUserRepo, UserRepo>();
            services.AddScoped<IUserServices, UserServices>();


            var sqlConnectionString = Configuration["DataAccessMsSqlServerProvider:ConnectionString"];
            services.AddDbContext<DataContext>(options =>
            options.UseSqlServer(sqlConnectionString));
            // Add framework services.
            services.AddMvc()
                .AddJsonOptions(opt => opt.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
