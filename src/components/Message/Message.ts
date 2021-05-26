import Block from '../../utils/Block';

import compile from '../../utils/compile';
import { formatTime } from '../../utils/date';
import { modifiers } from '../../utils/styles';

// @ts-ignore
import template from './Message.template';

import { IMessageProps } from './types';
import { StatusEnum } from '../../utils/types';

import './Message.scss';

export default class Message extends Block {
	readonly props: IMessageProps;

	constructor(props: IMessageProps) {
		super(props);
	}

	render(): Element {
		const { message, isOwnMessage } = this.props;
		const onlyFile = message.file && !message.content;

		return compile(template, {
			...message,
			status: message.is_read ? StatusEnum.read : StatusEnum.new,
			time: formatTime(new Date(message.time)),
			isOwnMessage,
			modifiers: onlyFile ? ['only-file'] : null,
			modifiersHelper: modifiers
		});
	}
}
