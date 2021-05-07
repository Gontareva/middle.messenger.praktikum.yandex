import Block from '../../utils/Block';

import compile from '../../utils/compile';
import { formatTime } from '../../utils/date';
import { modifiers } from '../../utils/styles';

import template from 'componentTemplates/Message.template.js';

import { IMessageProps } from './types';

export default class Message extends Block {
	readonly props: IMessageProps;

	constructor(props: IMessageProps) {
		super(props);
	}

	render() {
		const { message, isOwnMessage } = this.props;
		const onlyFile = message.fileUrl && !message.content;

		return compile(template, {
			...message,
			time: formatTime(new Date(message.time)),
			isOwnMessage,
			modifiers: onlyFile ? ['only-file'] : null,
			modifiersHelper: modifiers
		});
	}
}
