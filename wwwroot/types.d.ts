declare class Biba {
    private router;
    activatedController: ViewController;
    glboalController: ViewController;
    private static _cache;
    private constructor();
    static Start(mainElement: Element): void;
    static inject(name: string, injectible: any): void;
    static _get(name: string): any;
    private static activateController(path, el, router);
}
declare function Controller(path: string): (target: any) => void;

declare class Closure {
}

declare class ViewController {
    element: HTMLElement;
    scope: any;
    constructor(element: HTMLElement);
}

declare class RouterResponse {
}

declare class UrlUtils {
    static join(...args: string[]): string;
}
interface NodeListOf<TNode extends Node> extends NodeList {
    forEach: (callback: (currentValue?: TNode, currenIndex?: number, listObj?: NodeListOf<TNode>) => void) => void;
}

declare class BibaRouter {
    private rootElement;
    private routerContainer;
    private _currentRoute;
    baseUrl: string;
    readonly currentRoute: Route;
    constructor(baseUrl: string, rootElement?: HTMLElement);
    route(path?: string): Promise<any>;
    initRouterLinks(): boolean;
    private giveAnchorHandler(el);
    private routerLinkClickHandler(event);
    private getComponent(path, data?);
    onRouteStart(handler: {
        (args: any): void;
    }): void;
    onRouteFinish(handler: {
        (args: any): void;
    }): void;
}

interface Route {
    path: string;
    args?: any;
}

interface RouteEvent {
    (from?: Route | any, to?: Route, args?: BibaRouter): boolean | any;
}

declare class HttpClient {
    static request<T>(url: string, method: HttpMethod, options?: any): Promise<T | any>;
}
declare enum HttpMethod {
    GET = 0,
    POST = 1,
    PUT = 2,
    PATCH = 3,
    DELETE = 4,
    OPTIONS = 5,
    HEAD = 6,
    TRACE = 7,
    CONNECT = 8,
}

declare class UrlUtils {
    static join(...args: string[]): string;
}
interface NodeListOf<TNode extends Node> extends NodeList {
    forEach: (callback: (currentValue?: TNode, currenIndex?: number, listObj?: NodeListOf<TNode>) => void) => void;
}