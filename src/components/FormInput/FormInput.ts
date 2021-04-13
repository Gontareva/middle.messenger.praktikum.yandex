import Block from '../../utils/Block';

import compile from '../../utils/compile';

import template from 'componentTemplates/FormInput.template.js';

import { IFormInputProps } from './types';

export default class FormInput extends Block {
	constructor(props: IFormInputProps) {
		super(props);
	}

	render() {
		return compile(template, this.props);
	}
}
