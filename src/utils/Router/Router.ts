import Route from '../Route';
import Block from '../Block';

class Router {
	private static instance: Router;
	private routes: Route[];
	private history: History;
	private currentRoute?: Route;
	private readonly rootQuery: string;
	private errorPathname: string;

	constructor(rootQuery: string, singletone = true) {
		if (Router.instance && singletone) {
			return Router.instance;
		}

		this.routes = [];
		this.history = window.history;
		this.currentRoute = null;
		this.rootQuery = rootQuery;

		if (singletone) {
			Router.instance = this;
		}
	}

	use(
		pathname: string,
		title: string,
		getBlock: () => { new(): Block }
	): Router {
		const route = new Route(pathname, title, getBlock, {
			rootQuery: this.rootQuery
		});
		this.routes.push(route);

		return this;
	}

	useError(
		pathname: string,
		title: string,
		getBlock: () => { new(): Block }
	): Router {
		const route = new Route(pathname, title, getBlock, {
			rootQuery: this.rootQuery
		});
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

	onRoute(pathname: string): Route {
		const route = this.getRoute(pathname);

		if (this.currentRoute) {
			this.currentRoute.leave();
		}

		this.currentRoute = route;
		route.render();

		return route;
	}

	go(pathname: string): void {
		const route = this.onRoute(pathname);
		pathname = pathname.startsWith(route.pathname) ? pathname : route.pathname;
		this.history.pushState({ page: pathname }, route.title, pathname);
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
