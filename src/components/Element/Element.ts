import Block from '../../utils/Block';

import compile from '../../utils/compile';

import template from 'componentTemplates/Element.template.js';

import { IElementProps } from './types';

export default class Element extends Block {
	readonly props: IElementProps;

	constructor(props: IElementProps) {
		super(props);
	}

	render() {
		const { tagName, events, children, ...props } = this.props;

		return compile(template, {
			tagName: tagName || 'div',
			children,
			attributes: props
		});
	}
}
