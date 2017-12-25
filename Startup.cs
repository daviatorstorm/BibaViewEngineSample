using BibaViewEngine;
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
            services.AddBibaViewEngine<AppComponent>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseBibaViewEngine();
        }
    }
}
