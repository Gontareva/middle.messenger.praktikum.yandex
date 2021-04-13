import Block from '../../utils/Block';

import compile from '../../utils/compile';
import classnames from '../../utils/classnames';
import { modifiers } from '../../utils/styles';

import template from 'componentTemplates/Input.template.js';

import { IInputProps } from './types';

export default class Input extends Block {
	constructor(props: IInputProps) {
		super(props);
	}

	render() {
		const { className, error, ...props } = this.props;
		return compile(template, {
			className: classnames(className, error && modifiers('input', ['error'])),
			error,
			...props
		});
	}
}
