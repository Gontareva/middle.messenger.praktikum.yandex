import Block from '../../utils/Block';
import Element from '../Element';

import classnames from '../../utils/classnames';

import { IButtonProps } from './types';

export default class Button extends Block {
	readonly props: IButtonProps;

	constructor(props: IButtonProps) {
		super(props);
	}

	render() {
		const { text, themes = [], className, ...attrs } = this.props;
		const classes = classnames(
			'button',
			themes.map((theme) => `button_${theme}`),
			className
		);

		const el = new Element({
			tagName: 'button',
			class: classes,
			...attrs
		}).getContent();
		el.textContent = text;

		return el;
	}
}
