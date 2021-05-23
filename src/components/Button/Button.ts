import Block from '../../utils/Block';
import NodeElement from '../NodeElement';

import classnames from '../../utils/classnames';

import { IButtonProps } from './types';

export default class Button extends Block {
	readonly props: IButtonProps;

	constructor(props: IButtonProps) {
		super(props);
	}

	render() {
		const {
			text = '',
			themes = [],
			className,
			icon = '',
			...attrs
		} = this.props;
		const classes = classnames(
			'button',
			themes.map((theme) => `button_${theme}`),
			className
		);

		const el = new NodeElement({
			tagName: 'button',
			class: classes,
			...attrs
		}).getContent();
		el.innerHTML = `${icon}${text}`;

		return el;
	}
}
