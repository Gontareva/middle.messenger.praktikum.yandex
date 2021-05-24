import Block from '../../utils/Block';
import Button from '../Button';

import compile from '../../utils/compile';
import classnames from '../../utils/classnames';
import { icons } from '../../utils/constants';

// @ts-ignore
import template from './Modal.template';

import { IModalProps } from './types';

import './Modal.scss';

export default class Modal extends Block {
	constructor(props: IModalProps) {
		super({ isOpen: false, ...props });
	}

	handleCloseButtonClick(): void {
		if (this.props.onCloseButtonClick) {
			this.props.onCloseButtonClick();
		}
	}

	render(): Element {
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
