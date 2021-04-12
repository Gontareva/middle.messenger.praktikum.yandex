import Block from '../../utils/Block';
import Avatar from '../Avatar';
import Message from '../Message';
import Form from '../Form';
import Element from '../Element';
import Button from '../Button';

import compile from '../../utils/compile';
import { getFormatDate } from '../../utils/date';
import groupBy from '../../utils/groupBy';
import { modifiers } from '../../utils/styles';

import template from '../../../dist/templates/Chat.template.js';

import { IChatProps } from './types';
import { IMessage } from '../../utils/types';

export default class Chat extends Block {
	readonly props: IChatProps;
	private state: { message: string };

	constructor(props: IChatProps) {
		super(props);
	}

	init() {
		this.state = { message: '' };
	}

	sort(message1: IMessage, message2: IMessage): number {
		return message1.publishDate.getTime() - message2.publishDate.getTime() >= 0
			? 1
			: -1;
	}

	render() {
		const { chat, user } = this.props;

		const days: { [key: string]: IMessage[] } = groupBy(chat.messages, (item) =>
			getFormatDate(item.publishDate)
		);

		return compile(template, {
			avatar: new Avatar({ imageSrc: chat.user.avatar }),
			userName: chat.user.display_name,
			days: Object.entries(days).map(
				([date, messages]: [string, IMessage[]]) => ({
					date,
					messages: messages.sort(this.sort).map((message, index) => {
						const modifiers = [];

						const isOwnMessage = message.fromUserId === user._id;

						if (isOwnMessage) {
							modifiers.push('own');
						}

						const nextMessage =
							index - 1 < messages.length && messages[index + 1];
						const isLastMessageInBlock =
							!nextMessage ||
							nextMessage.fromUserId !== message.fromUserId ||
							nextMessage.publishDate.getTime() -
								message.publishDate.getTime() >
								60000;

						if (isLastMessageInBlock) {
							modifiers.push('last');
						}

						return {
							modifiers,
							node: new Message({
								message,
								isOwnMessage
							})
						};
					})
				})
			),
			form: new Form({
				schema: {
					message: [
						(string) =>
							/апельсин/.test(string)
								? 'Нельзя использовать слово "апельсин"!'
								: null,
						'required'
					]
				},
				events: {
					change: (values) => {
						this.state = values;
					}
				},
				theme: 'row',
				render: (errors) => {
					return {
						body: [
							new Button({
								className: 'chat__clip-button'
							}),
							new Element({
								tagName: 'div',
								class: 'chat__text-block',
								children: [
									new Element({
										tagName: 'textarea',
										class: 'chat__input',
										placeholder: 'Сообщение',
										rows: 1,
										// autofocus: true,
										name: 'message',
										children: this.state.message
									}),
									new Element({
										tagName: 'span',
										class: 'chat__error',
										children: errors.message
									})
								]
							}),
							new Button({
								className: 'chat__send-button',
								themes: ['primary'],
								type: 'submit'
							})
						]
					};
				}
			}),
			modifiersHelper: modifiers
		});
	}
}
