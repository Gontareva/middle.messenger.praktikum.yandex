import { staticDomain } from '../../../config';

import Block from '../../utils/Block';
import compile from '../../utils/compile';
import NodeElement from '../NodeElement';

import template from 'componentTemplates/Avatar.template.js';

import { IAvatarProps } from './types';

export default class Avatar extends Block {
	readonly props: IAvatarProps;
	private input: Block;
	private htmlInputElement: HTMLInputElement;

	constructor({ imageSrc, canChange = false, ...props }: IAvatarProps) {
		super({
			imageSrc: imageSrc ? staticDomain + imageSrc : '',
			canChange,
			...props
		});
	}

	init() {
		this.setProps({
			events: {
				click: this.onClick.bind(this)
			}
		});

		const { canChange } = this.props;
		const events = canChange ? { change: this.onChange.bind(this) } : {};

		this.input = new NodeElement({
			tagName: 'input',
			type: 'file',
			class: 'hidden',
			events
		});
		this.htmlInputElement = this.input.getContent() as HTMLInputElement;
	}

	onChange(): void {
		if (this.props.onChange) {
			const formData = new FormData();
			formData.set('avatar', this.htmlInputElement.files[0]);

			this.props.onChange(formData);
		}
	}

	onClick() {
		if (this.props.canChange) {
			this.htmlInputElement.click();
		}
	}

	render() {
		const { onChange, ...props } = this.props;

		return compile(template, {
			...props,
			input: this.input
		});
	}
}
