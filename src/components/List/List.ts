import Block from '../../utils/Block';

import compile from '../../utils/compile';
import classnames from '../../utils/classnames';
import { modifiers } from '../../utils/styles';

// @ts-ignore
import template from './List.template';

import { IListProps } from './types';

import './List.scss';

export default class List extends Block {
	readonly props: IListProps;

	constructor(props: IListProps) {
		super({ items: [], ...props });
	}

	render(): Element {
		const { theme, ...props } = this.props;
		const className = classnames({ [`list_${theme}`]: theme });

		return compile(template, {
			className,
			modifiersHelper: modifiers,
			...props
		});
	}
}
