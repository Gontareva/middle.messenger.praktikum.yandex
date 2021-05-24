import Block from '../../utils/Block';

import compile from '../../utils/compile';

// @ts-ignore
import template from './NodeElement.template';

import { INodeElementProps } from './types';

export default class NodeElement extends Block {
	readonly props: INodeElementProps;

	constructor(props: INodeElementProps) {
		super(props);
	}

	render(): Element {
		const { tagName, events, children, ...props } = this.props;

		return compile(template, {
			tagName: tagName || 'div',
			children,
			attributes: props
		});
	}
}
