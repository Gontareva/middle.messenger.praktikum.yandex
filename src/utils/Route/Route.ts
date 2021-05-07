import Block from '../Block';
import isEqual from '../isEqual';
import { renderPage } from '../common';

class Route {
	private pathname: string;
	private readonly getBlock: () => { new (): Block };
	private block: Block | null;
	private props: Record<string, any>;

	constructor(
		pathname: string,
		getBlock: () => { new (): Block },
		props: Record<string, any>
	) {
		this.pathname = pathname;
		this.getBlock = getBlock;
		this.block = null;
		this.props = props;
	}

	navigate(pathname: string): void {
		if (this.match(pathname)) {
			this.pathname = pathname;
			this.render();
		}
	}

	leave(): void {
		if (this.block) {
			this.block.element.remove();
			this.block = null;
		}
	}

	match(pathname: string): boolean {
		return isEqual(pathname, this.pathname);
	}

	render(): void {
		if (!this.block) {
			const blockClass = this.getBlock();
			this.block = new blockClass();
			renderPage(this.props.rootQuery, this.block);
			return;
		}

		this.block.show();
	}
}

export default Route;
