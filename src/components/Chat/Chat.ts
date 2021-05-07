import Block from '../../utils/Block';
import Avatar from '../Avatar';
import Message from '../Message';
import Form from '../Form';
import NodeElement from '../Element';
import Button from '../Button';
import Modal from '../Modal';
import Input from '../Input';

import compile from '../../utils/compile';
import { getFormatDate } from '../../utils/date';
import groupBy from '../../utils/groupBy';
import { modifiers } from '../../utils/styles';
import chatController from '../../utils/controllers/chat';
import {
	attachListener,
	detachListener,
	makeSelector
} from '../../utils/Store';
import { icons } from '../../utils/constants';

import template from 'componentTemplates/Chat.template.js';

import { IChatProps } from './types';
import { IMessage } from '../../utils/types';

export default class Chat extends Block {
	readonly props: IChatProps;
	private state: {
		message: string;
		modalIsOpen: boolean;
		newUser: { login: string };
	};

	constructor(props: IChatProps) {
		super(props);

		attachListener('messages', this.getMessages);
	}

	init() {
		this.state = {
			message: '',
			modalIsOpen: false,
			newUser: { login: '' }
		};

		chatController.initChat(this.props.user.id, this.props.chat.id);
	}

	// componentDidMount() {}

	componentWillUnmount(): void {
		detachListener('messages', this.getMessages);
	}

	sort(message1: IMessage, message2: IMessage): number {
		return message1.time.getTime() - message2.time.getTime() >= 0 ? 1 : -1;
	}

	getMessages = (): void => {
		const messages = makeSelector(
			(state) => state.messages || {},
			(obj) => obj[this.props.chat.id] || []
		);

		this.setProps({ messages });

		return messages;
	};

	onSubmit = ({ message }: { message: string }): void => {
		chatController.sendMessage(this.props.user.id, this.props.chat.id, message);
		this.setState({ message: '' });
	};

	toggleModal = (): void => {
		this.setState({ modalIsOpen: !this.state.modalIsOpen });
	};

	addUser({ login }) {
		chatController.addUser(login, this.props.chat.id);
	}

	render(): Element {
		const { chat, user, messages = [] } = this.props;

		const days: { [key: string]: IMessage[] } = groupBy(messages, (item) =>
			getFormatDate(item.time)
		);

		return compile(template, {
			avatar: new Avatar({ imageSrc: chat.avatar }),
			userName: chat.title,
			days: Object.entries(days)
				.reverse()
				.map(([date, messages]: [string, IMessage[]]) => ({
					date,
					messages: messages.sort(this.sort).map((message, index) => {
						const modifiers = [];

						const isOwnMessage = message.user_id === user.id;

						if (isOwnMessage) {
							modifiers.push('own');
						}

						const nextMessage =
							index - 1 < messages.length && messages[index + 1];
						const isLastMessageInBlock =
							!nextMessage ||
							nextMessage.user_id !== message.user_id ||
							nextMessage.time.getTime() - message.time.getTime() > 60000;

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
				})),
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
						this.setState(values);
					},
					submit: this.onSubmit
				},
				theme: 'row',
				render: (errors) => ({
					body: [
						new Button({
							className: 'chat__clip-button'
						}),
						new NodeElement({
							tagName: 'div',
							class: 'chat__text-block',
							children: [
								new NodeElement({
									tagName: 'textarea',
									class: 'chat__input',
									placeholder: 'Сообщение',
									rows: 1,
									name: 'message',
									children: this.state.message
								}),
								new NodeElement({
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
				})
			}),
			addUserButton: new Button({
				icon: icons.add,
				themes: ['simple'],
				events: {
					click: this.toggleModal
				}
			}),
			modal: new Modal({
				isOpen: this.state.modalIsOpen,
				onCloseButtonClick: this.toggleModal,
				render: () => ({
					header: 'Добавление пользователя',
					children: new Form({
						schema: {
							login: ['required']
						},
						events: {
							change: (newValue) => {
								this.setState({ newUser: newValue });
							},
							submit: this.addUser.bind(this)
						},
						render: (errors) => ({
							body: new Input({
								label: 'Логин пользователя',
								type: 'text',
								name: 'login',
								value: this.state.newUser.login,
								error: errors.login
							}),
							footer: new Button({
								text: 'Добавить пользователя',
								type: 'submit',
								themes: ['primary']
							})
						})
					})
				})
			}),
			modifiersHelper: modifiers
		});
	}
}
