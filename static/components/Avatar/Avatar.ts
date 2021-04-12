import Block from '../../utils/Block';
import compile from '../../utils/compile';

import template from '../../../dist/templates/Avatar.template.js';

import { IAvatarProps } from './types';

export default class Avatar extends Block {
	readonly props: IAvatarProps;

	constructor({ imageSrc = '', canChange = false }: IAvatarProps) {
		super({ imageSrc, canChange });
	}

	render() {
		return compile(template, this.props);
	}
}
