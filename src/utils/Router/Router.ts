import Route from '../Route';
import Block from '../Block';

class Router {
	private static instance: Router;
	private routes: Route[];
	private history: History;
	private currentRoute?: Route;
	private readonly rootQuery: string;
	private errorPathname: string;

	constructor(rootQuery: string) {
		if (Router.instance) {
			return Router.instance;
		}

		this.routes = [];
		this.history = window.history;
		this.currentRoute = null;
		this.rootQuery = rootQuery;

		Router.instance = this;
	}

	use(pathname: string, getBlock: () => { new (): Block }): Router {
		const route = new Route(pathname, getBlock, { rootQuery: this.rootQuery });
		this.routes.push(route);

		return this;
	}

	useError(pathname: string, getBlock: () => { new (): Block }): Router {
		const route = new Route(pathname, getBlock, { rootQuery: this.rootQuery });
		this.routes.push(route);
		this.errorPathname = pathname;

		return this;
	}

	start(): void {
		this.onRoute(window.location.pathname);

		window.onpopstate = () => {
			this.onRoute(window.location.pathname);
		};
	}

	onRoute(pathname: string): void {
		const route = this.getRoute(pathname);

		if (this.currentRoute) {
			this.currentRoute.leave();
		}

		this.currentRoute = route;
		route.render();
	}

	go(pathname: string): void {
		this.onRoute(pathname);
		this.history.pushState({}, pathname, pathname);
	}

	back(): void {
		this.history.back();
	}

	forward(): void {
		this.history.forward();
	}

	getRoute(pathname: string): Route {
		const route = this.routes.find((route) => route.match(pathname));

		if (route) {
			return route;
		}

		return this.routes.find((route) => route.match(this.errorPathname));
	}
}

export default Router;
