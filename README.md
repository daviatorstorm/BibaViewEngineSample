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
            app.UseStaticFiles(); // I next releases it will not be required
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

Details at [App Start](https://github.com/daviatorstorm/BibaViewEngine/wiki/App-Start)

## Components

As we are creating na internet store we must to add some styles. Lets add Bootstrap styles to
our application

`index.html`

```
<!DOCTYPE html>
<html>
<head>
    <title>Main</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <link rel="stylesheet" href="/main.css" />
</head>
<body>
    <app />

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
</body>
</html>
```

Now, create `MyHeaderComponent` (why MyHeader? because `header` tag is allready registered.
They will be ignore in compilation). And I will use here starter-template from bootstrap site.

```
// MyHeaderComponent.cs
using BibaViewEngine;

namespace BibaViewEngineTutorial.Client
{
    public class MyHeaderComponent : Component
    {
    }
}

// MyHeaderComponent.html
<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" aria-expanded="false" aria-controls="navbarsExampleDefault" aria-label="Toggle navigation" type="button" data-target="#navbarsExampleDefault" data-toggle="collapse">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="dropdown01" aria-expanded="false" aria-haspopup="true" href="http://example.com" data-toggle="dropdown">Dropdown</a>
                <div class="dropdown-menu" aria-labelledby="dropdown01">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" aria-label="Search" type="text" placeholder="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
    </div>
</nav>

// main.css
body {
    padding-top: 5rem;
}

.starter-template {
    padding: 3rem 1.5rem;
    text-align: center;
}

// AppComponent.html
<myheader />

<div class="container" role="main">
    <div class="starter-template">
        <h1>Bootstrap starter template</h1>
        <p class="lead">Use this document as a way to quickly start any new project.<br> All you get is this text and a mostly barebones HTML document.</p>
    </div>
</div>
```

Lets make a hack and pass some value to `MyHeaderComponent`. Chnage `AppComponent` to this

```
using BibaViewEngine;

namespace BibaViewEngineTutorial.Client
{
    public class AppComponent : Component
    {
        public string Title { get; set; } = "My iStrore";
    }
}

<myheader title="Title" />

<div class="container" role="main">
    <div class="starter-template">
        <h1>Bootstrap starter template</h1>
        <p class="lead">Use this document as a way to quickly start any new project.<br> All you get is this text and a mostly barebones HTML document.</p>
    </div>
</div>
```

And `MyHeaderComponent`

```
using BibaViewEngine;
using BibaViewEngine.Attributes;

namespace BibaViewEngineTutorial.Client
{
    public class MyHeaderComponent : Component
    {
        [Input]
        public string Title { get; set; }
    }
}

<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#">([Title])</a>
    <button class="navbar-toggler" aria-expanded="false" aria-controls="navbarsExampleDefault" aria-label="Toggle navigation" type="button" data-target="#navbarsExampleDefault" data-toggle="collapse">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="dropdown01" aria-expanded="false" aria-haspopup="true" href="http://example.com" data-toggle="dropdown">Dropdown</a>
                <div class="dropdown-menu" aria-labelledby="dropdown01">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" aria-label="Search" type="text" placeholder="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
    </div>
</nav>
```

Start an application

So now you know how to pass values between components.

Details at [Components](https://github.com/daviatorstorm/BibaViewEngine/wiki/Components)

## Routing

Routing is one of the core features of BibaViewEngine as it gives the good posibility to
crete SPA applications. As SPA application we are waiting some intereactivity. So how 
does it works in BibaViewEngine. You're clicking a link and gets new view in some place
at html. That how it works. You are clicking a route button its causes a request to server
with specific route with "/c" at the url start. Then server looks up to a route collection,
finds a correct route, compiles a component under that route and return a compiled html pasting
it to a specific place on a html. Lets take a look how it works in code

Now we gonna add a few routes in `Startup.cs`

```
services.AddBibaViewEngine<AppComponent>(new Routes
{
    new BibaRoute { Path = "", Component = typeof(MainComponent) },
    new BibaRoute { Path = "store", Component = typeof(StoreComponent) }
});
```

Then we must to add `MainComponent` and `StoreComponent`. Do it as created component before.
After that change `AppComponent` template so it looks like that

```
<myheader title="Title" />

<div router-container></div>
```

`<div router-container></div>` has attribute `router-container` that makes that div a 
container for routes


Then in `MyHeaderComponent` template add router paths for your created components so it looks
like that

```
<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" router-path="/">([Title])</a>
    <button class="navbar-toggler" aria-expanded="false" aria-controls="navbarsExampleDefault" aria-label="Toggle navigation" type="button" data-target="#navbarsExampleDefault" data-toggle="collapse">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" router-path="/">Home<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" router-path="/store">Store<span class="sr-only">(current)</span></a>
            </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" aria-label="Search" type="text" placeholder="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
    </div>
</nav>
```

Launch an application application

Click 'Home' and 'Store' buttons and to Network in Developer Tools. There you will track  
requests when clicking those links

Details in [Routing](https://github.com/daviatorstorm/BibaViewEngine/wiki/Routing)

> Advanced:
[Child Routing](https://github.com/daviatorstorm/BibaViewEngine/wiki/Child-Routing)
and
[Authorization](https://github.com/daviatorstorm/BibaViewEngine/wiki/Authorization)

## Client Side

We've been creating a servre side that serves a compiled html templates but there is another 
fine thing in BibaViewEngine. You have a control under backend and frontend. So lets dive
into frontend a bit

Client Side is optimized for Typescript, but you still can use JavaScript. For now I will 
show how to work with Typescript

First crete a Typescritp execution environment. Create a `tsconfig.json` file

```
{
  "include": ["wwwroot"],
  "compilerOptions": {
    "module": "none",
    "outFile": "wwwroot/build.js",
    "experimentalDecorators": true
  }
}
```

Add `wwwroot/main-controller.ts`
```
@Controller("*")
class MainController extends ViewController {
    constructor(el) {
        super(el);

        console.log("In main controller", el);
    }
}
```

And add `<script src="build.js"></script>` in end of body element in `index.html`

Launch the application. You can see in console something like 
`In main controller [object HTMLUnknownElement]`. This controller with mark `*`
activates when the `/app/start` request ends with 200 status. This is not required option.
Also you can add such controllers for every route you have. Lets create one. The `el` argument
is an element that cames from server, in this example it is a compiled `AppComponent` template

```
@Controller("/store")
class StoreController extends ViewController {
    constructor(el, router) {
        super(el);

        console.log('In store controller', router);
    }
}
```

The second argument is a router

`BibaRouter`

* `baseUrl: string`
* `currentRoute: object` - current route details
* `rootElement: HTMLElement` - element where router is watching for routes
* `routerContainer: HTMLElement` - element that contains route html
* `route(path: string): Promise` - function helps to navigate to an url

## Under construction