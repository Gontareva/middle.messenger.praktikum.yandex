import Block from '../../utils/Block';

import compile from '../../utils/compile';
import { router } from '../../utils/Router';
import { icons } from '../../utils/constants';

// @ts-ignore
import template from './BackButton.template';

export default class BackButton extends Block {
	constructor(props?: Record<string, unknown>) {
		super(props);
	}

	init(): void {
		this.setProps({
			events: {
				click: this.onBackButtonClick.bind(this),
				...this.props.events
			}
		});
	}

	onBackButtonClick(): void {
		router.back();
	}

	render(): Element {
		return compile(template, { ...this.props, icon: icons.arrow });
	}
}
