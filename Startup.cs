using BibaViewEngine;
using BibaViewEngine.Router;
using BibaViewEngineTutorial.Client;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace BibaViewEngineTutorial
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddBibaViewEngine<AppComponent>(new Routes
            {
                new BibaRoute { Path = "", Component = typeof(MainComponent) },
                new BibaRoute { Path = "store", Component = typeof(StoreComponent) }
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseStaticFiles();

            app.UseBibaViewEngine();
        }
    }
}
