var Biba = /** @class */ (function () {
    function Biba(mainComponent, router) {
        var _this = this;
        this.router = router;
        this.router.onRouteFinish(function (args) {
            _this.activatedController = Biba.activateController(args.currentRoute.path == '/' ? '' : args.currentRoute.path, args.element, _this.router);
        });
        this.glboalController = mainComponent;
        window.onpopstate = function (event) {
            if (event.target.history.state)
                _this.router.route(event.target.history.state.path);
        };
    }
    Biba.Start = function (mainElement) {
        HttpClient.request('/app/start', HttpMethod.GET).then(function (res) {
            var data = JSON.parse(res.response);
            mainElement.innerHTML = data.html;
            Biba.inject('scope', data.scope);
            var router = new BibaRouter('/');
            router.initRouterLinks();
            router.route(location.pathname);
            new Biba(Biba.activateController('*', mainElement, router), router);
            Biba.inject('currentRoute', { path: location.pathname });
        });
    };
    Biba.inject = function (name, injectible) {
        Biba._cache[name] = injectible;
    };
    Biba._get = function (name) {
        return Biba._cache[name];
    };
    Biba.activateController = function (path, el, router) {
        var controller = Biba._get(path);
        var instance;
        if (controller) {
            instance = new controller(el, router);
        }
        return instance;
    };
    Biba._cache = {};
    return Biba;
}());
function Controller(path) {
    return function (target) {
        Biba.inject(path, target);
    };
}
(function () {
    document.onreadystatechange = function (event) {
        if (document.readyState == 'complete') {
            Biba.Start(document.getElementsByTagName('app')[0]);
        }
    };
})();

var ViewController = /** @class */ (function () {
    function ViewController(element) {
        this.element = element;
        this.scope = Biba._get('scope');
    }
    return ViewController;
}());

var BibaRouter = /** @class */ (function () {
    function BibaRouter(baseUrl, rootElement) {
        if (rootElement === void 0) { rootElement = document.documentElement; }
        this.rootElement = rootElement;
        this.baseUrl = baseUrl || '/';
    }
    Object.defineProperty(BibaRouter.prototype, "currentRoute", {
        get: function () {
            return Biba._get('currentRoute');
        },
        enumerable: true,
        configurable: true
    });
    BibaRouter.prototype.route = function (path) {
        var _this = this;
        if (path === void 0) { path = this.baseUrl; }
        path = path || this.baseUrl;
        if (this.currentRoute && path == this.currentRoute.path)
            return;
        document.dispatchEvent(new CustomEvent('onRouteStart', { detail: { path: path } }));
        return this.getComponent(path).then(function (response) {
            var data = JSON.parse(response.response);
            _this.routerContainer.innerHTML = data.html;
            Biba.inject('scope', data.scope);
            history.pushState({ path: path }, document.title, path);
            var newRouter = new BibaRouter(location.pathname, _this.routerContainer);
            if (!newRouter.initRouterLinks()) {
                newRouter = null;
                _this.initRouterLinks();
            }
            _this.currentRoute.path = path;
            document.dispatchEvent(new CustomEvent('onRouteFinish', {
                detail: {
                    currentRoute: _this.currentRoute,
                    element: _this.routerContainer
                }
            }));
            return response;
        });
    };
    BibaRouter.prototype.initRouterLinks = function () {
        var _this = this;
        var hasChildContainer = false;
        var rc = this.rootElement.querySelector('[router-container]');
        if (rc) {
            this.routerContainer = rc;
            this.routerContainer.attributes.removeNamedItem('router-container');
            hasChildContainer = true;
        }
        var allElements = this.rootElement.querySelectorAll('[router-path]');
        allElements.forEach(function (item) {
            var path = item.attributes.getNamedItem('router-path').value;
            if (path[0] != '/' && hasChildContainer)
                path = UrlUtils.join(_this.baseUrl, path);
            item.path = path;
            item.attributes.removeNamedItem('router-path');
            _this.giveAnchorHandler(item);
        });
        return hasChildContainer;
    };
    BibaRouter.prototype.giveAnchorHandler = function (el) {
        var _this = this;
        el.onclick = function (e) { return _this.routerLinkClickHandler(e); };
    };
    BibaRouter.prototype.routerLinkClickHandler = function (event) {
        var componentPath = event.target.path;
        this.route(componentPath);
        return false;
    };
    BibaRouter.prototype.getComponent = function (path, data) {
        return HttpClient.request(("c/" + path).replace('//', '/'), HttpMethod.GET);
    };
    BibaRouter.prototype.onRouteStart = function (handler) {
        document.addEventListener('onRouteStart', function (args) { handler(args.detail); }, false);
    };
    BibaRouter.prototype.onRouteFinish = function (handler) {
        document.addEventListener('onRouteFinish', function (args) { handler(args.detail); }, false);
    };
    return BibaRouter;
}());



var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.request = function (url, method, options) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(HttpMethod[method], url, true);
            xhr.onload = function (event) {
                if (xhr.status >= 200 && xhr.status < 300)
                    resolve(event.target);
                else
                    reject({
                        status: xhr.status,
                        errorText: xhr.responseText
                    });
            };
            xhr.onerror = function (event) {
                reject({
                    status: xhr.status,
                    errorText: xhr.responseText
                });
            };
            xhr.send(options ? options.data : null);
        });
    };
    return HttpClient;
}());
var HttpMethod;
(function (HttpMethod) {
    HttpMethod[HttpMethod["GET"] = 0] = "GET";
    HttpMethod[HttpMethod["POST"] = 1] = "POST";
    HttpMethod[HttpMethod["PUT"] = 2] = "PUT";
    HttpMethod[HttpMethod["PATCH"] = 3] = "PATCH";
    HttpMethod[HttpMethod["DELETE"] = 4] = "DELETE";
    HttpMethod[HttpMethod["OPTIONS"] = 5] = "OPTIONS";
    HttpMethod[HttpMethod["HEAD"] = 6] = "HEAD";
    HttpMethod[HttpMethod["TRACE"] = 7] = "TRACE";
    HttpMethod[HttpMethod["CONNECT"] = 8] = "CONNECT";
})(HttpMethod || (HttpMethod = {}));

var UrlUtils = /** @class */ (function () {
    function UrlUtils() {
    }
    UrlUtils.join = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var parts = [];
        Array.prototype.slice.call(arguments).forEach(function (element) {
            var subParts = element.split('/');
            subParts.forEach(function (subEl) {
                if (subEl)
                    parts.push(subEl.match(/[\w$-_.+!*'()]+/));
            });
        });
        return parts.join('/');
    };
    return UrlUtils;
}());