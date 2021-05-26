import Block from '../../utils/Block';

import compile from '../../utils/compile';
import classnames from '../../utils/classnames';
import { modifiers } from '../../utils/styles';

// @ts-ignore
import template from './Input.template';

import { IInputProps } from './types';

import './Input.scss';

export default class Input extends Block {
	constructor(props: IInputProps) {
		super(props);
	}

	render(): Element {
		const { className, error, ...props } = this.props;
		return compile(template, {
			className: classnames(className, error && modifiers('input', ['error'])),
			error,
			...props
		});
	}
}
