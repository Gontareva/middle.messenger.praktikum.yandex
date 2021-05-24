import Block from '../../utils/Block';

import compile from '../../utils/compile';

// @ts-ignore
import template from './FormInput.template';

import { IFormInputProps } from './types';

import './FormInput.scss';

export default class FormInput extends Block {
	constructor(props: IFormInputProps) {
		super(props);
	}

	render(): Element {
		return compile(template, this.props);
	}
}
