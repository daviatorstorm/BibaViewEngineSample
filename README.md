# Overview

Welcome to BibaViewEngine tutorial. Here you will see how its easy to create simple
and scalable apps for what ever you want. So lets take a look who it works. In this 
example we will build simple internet-market.

Ready, steady, GO!

## Start

I will use cli commands. You can use Visual Studio templates as well it not makes any difference.

So, first create a `ASP.NET Core 2.0` project, `dotnet new web`, install package 
`dotnet add package BibaViewEngine` or from nuget package manager
and set `Include prerelease` checkbox as `BibaViewEngine` is in **beta**.

Now we will do some file magic in `.csproj` file. In plain template csproj may look like this

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp2.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <Folder Include="wwwroot\" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="BibaViewEngine" Version="0.0.6-beta-1.0.4" />
    <PackageReference Include="Microsoft.AspNetCore.All" Version="2.0.3" />
  </ItemGroup>

</Project>

```

We just need to add some magic rows

```
<ItemGroup>
    <None Include="Client/**/*.html">
        <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </None>
</ItemGroup>
```

These allows all html component templates copy to output directory as well as to publish one.
Then wi must add `index.html` file to `wwwroot` directory

```
<!DOCTYPE html>
<html>
<head>
    <title>Main</title>
</head>
<body>
    <app />
</body>
</html>
```

Now we can move to configuration

## Configuration

In `Startup.cs` add lines below

```
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

```

And add `AppComponent` to `Client` folder with tempalte

```
// AppComponent.cs
using BibaViewEngine;

namespace BibaViewEngineTutorial.Client
{
    public class AppComponent : Component
    {
    }
}

// AppComponent.html
<h1>Hello from AppComponent</h1>
```

Now you can start an application and try

Details at [wiki](https://github.com/daviatorstorm/BibaViewEngine/wiki/App-Start)