import Block from '../../utils/Block';
import Element from '../Element';

import classnames from '../../utils/classnames';

import { ILinkProps } from './types';

export default class Link extends Block {
	readonly props: ILinkProps;

	constructor(props: ILinkProps) {
		super(props);
	}

	render() {
		const { text, themes = [], className, ...attrs } = this.props;

		const classes = classnames(
			'link',
			themes.map((theme) => `link_${theme}`),
			className
		);

		const el = new Element({
			tagName: 'a',
			class: classes,
			...attrs
		}).getContent();
		el.textContent = text;

		return el;
	}
}
