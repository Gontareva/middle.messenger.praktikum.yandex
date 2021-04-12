import Block from '../../utils/Block';

import compile from '../../utils/compile';
import classnames from '../../utils/classnames';
import { modifiers } from '../../utils/styles';

import template from '../../../dist/templates/List.template.js';

import { IListProps } from './types';

export default class List extends Block {
	readonly props: IListProps;

	constructor(props: IListProps) {
		super({ items: [], ...props });
	}

	render() {
		const { theme, ...props } = this.props;
		const className = classnames({ [`list_${theme}`]: theme });

		return compile(template, {
			className,
			modifiersHelper: modifiers,
			...props
		});
	}
}
