import Block from '../../utils/Block';
import Button from '../Button';

import compile from '../../utils/compile';
import classnames from '../../utils/classnames';
import { icons } from '../../utils/constants';

import template from 'componentTemplates/Modal.template.js';

import { IModalProps } from './types';

export default class Modal extends Block {
	constructor(props: IModalProps) {
		super({ isOpen: false, ...props });
	}

	handleCloseButtonClick(): void {
		if (this.props.onCloseButtonClick) {
			this.props.onCloseButtonClick();
		}
	}

	render() {
		const { theme, render, isOpen } = this.props;
		const { className, ...props } = render();
		const classes = classnames(className, {
			[`modal_${theme}`]: theme,
			modal_open: isOpen
		});

		const closeButton = new Button({
			events: {
				click: this.handleCloseButtonClick.bind(this)
			},
			themes: ['simple'],
			icon: icons.close
		});

		return compile(template, {
			className: classes,
			closeButton,
			...props
		});
	}
}
