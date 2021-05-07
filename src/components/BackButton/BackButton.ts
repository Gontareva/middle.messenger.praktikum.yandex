import Block from '../../utils/Block';

import compile from '../../utils/compile';
import { router } from '../../utils/Router';

import template from 'componentTemplates/BackButton.template.js';
import { icons } from '../../utils/constants';

export default class BackButton extends Block {
	constructor(props?: Record<string, unknown>) {
		super(props);
	}

	init() {
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
