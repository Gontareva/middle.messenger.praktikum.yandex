import Link from '../Link';

import Block from '../../utils/Block';
import { router } from '../../utils/Router';

import { IAppLinkProps } from './types';

export default class AppLink extends Block {
	readonly props: IAppLinkProps;

	constructor(props?: IAppLinkProps) {
		super(props);
	}

	onClick(event: Event): void {
		event.preventDefault();

		router.go(this.props.href);
	}

	render(): Element {
		return new Link({
			...this.props,
			events: {
				click: this.onClick.bind(this),
				...this.props.events
			}
		}).getContent();
	}
}
