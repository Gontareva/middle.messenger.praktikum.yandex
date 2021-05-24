import Block from '../../utils/Block';
import NodeElement from '../NodeElement';

import classnames from '../../utils/classnames';

import { ILinkProps } from './types';

import './Link.scss';

export default class Link extends Block {
	readonly props: ILinkProps;

	constructor(props: ILinkProps) {
		super(props);
	}

	render(): Element {
		const { text, themes = [], className, ...attrs } = this.props;

		const classes = classnames(
			'link',
			themes.map((theme) => `link_${theme}`),
			className
		);

		const el = new NodeElement({
			tagName: 'a',
			class: classes,
			...attrs
		}).getContent();
		el.textContent = text;

		return el;
	}
}
