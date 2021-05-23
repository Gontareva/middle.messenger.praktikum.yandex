import Block from '../../utils/Block';

import compile from '../../utils/compile';

import template from 'componentTemplates/NodeElement.template.js';

import { INodeElementProps } from './types';

export default class NodeElement extends Block {
	readonly props: INodeElementProps;

	constructor(props: INodeElementProps) {
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
