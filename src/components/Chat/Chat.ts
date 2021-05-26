import Block from '../../utils/Block';
import Avatar from '../Avatar';
import Message from '../Message';
import Form from '../Form';
import NodeElement from '../NodeElement';
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

// @ts-ignore
import template from './Chat.template';

import { IChatProps } from './types';
import { IMessage } from '../../utils/types';
import UserList from '../UserList/UserList';

import './Chat.scss';

export default class Chat extends Block {
	readonly props: IChatProps;
	public state: {
		message: string;
		modalIsOpen: boolean;
		actionUser: { login: string };
		addUser: boolean;
	};
	private input: NodeElement;
	private htmlInputElement: HTMLInputElement;

	constructor(props: IChatProps) {
		super(props);

		attachListener('messages', this.getMessages);
	}

	init(): void {
		this.state = {
			message: '',
			modalIsOpen: false,
			actionUser: { login: '' },
			addUser: true
		};

		this.input = new NodeElement({
			tagName: 'input',
			type: 'file',
			class: 'hidden',
			events: { change: this.sendFile.bind(this) }
		});
		this.htmlInputElement = this.input.getContent() as HTMLInputElement;
	}

	componentDidMount(): void {
		chatController.initChat(this.props.user.id, this.props.chat.id);
	}

	componentWillUnmount(): void {
		detachListener('messages', this.getMessages);
	}

	sort(message1: IMessage, message2: IMessage): number {
		return message1.time.getTime() - message2.time.getTime() >= 0 ? 1 : -1;
	}

	getMessages = (): IMessage[] => {
		const messages = makeSelector(
			(state) => state.messages || {},
			(obj) => obj[this.props.chat.id] || []
		) as IMessage[];

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

	addUser({ login }: { login: string }): void {
		chatController.addUser(login, this.props.chat.id).then(() => {
			this.setState({ modalIsOpen: false, actionUser: { login: '' } });
		});
	}

	removeUser({ login }: { login: string }): void {
		chatController.removeUser(login, this.props.chat.id).then(() => {
			this.setState({ modalIsOpen: false, actionUser: { login: '' } });
		});
	}

	onAddUserButton = (): void => {
		this.setState({ modalIsOpen: !this.state.modalIsOpen, addUser: true });
	};

	onRemoveUserButton = (): void => {
		this.setState({ modalIsOpen: !this.state.modalIsOpen, addUser: false });
	};

	sendFile(): void {
		const formData = new FormData();
		formData.set('file', this.htmlInputElement.files[0]);

		chatController.sendFile(formData, this.props.chat.id);
	}

	onSendButtonClick(): void {
		this.htmlInputElement.click();
	}

	render(): Element {
		const { chat, user, messages = [] } = this.props;

		const days: { [key: string]: IMessage[] } = groupBy(messages, (item) =>
			getFormatDate(item.time)
		);
		const { users = [] } = chat;

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
						(string: string) =>
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
						this.input,
						new Button({
							className: 'chat__clip-button',
							events: {
								click: this.onSendButtonClick.bind(this)
							}
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
							icon: icons.arrow,
							type: 'submit'
						})
					]
				})
			}),
			addUserButton: new Button({
				icon: icons.add,
				themes: ['simple'],
				events: {
					click: this.onAddUserButton
				}
			}),
			removeUserButton: new Button({
				icon: icons.remove,
				themes: ['simple'],
				events: {
					click: this.onRemoveUserButton
				}
			}),
			modal: new Modal({
				isOpen: this.state.modalIsOpen,
				onCloseButtonClick: this.toggleModal,
				render: () => ({
					header: this.state.addUser
						? 'Добавление пользователя'
						: 'Удаление пользователя',
					children: new Form({
						schema: {
							login: ['required']
						},
						events: {
							change: (newValue) => {
								this.setState({ actionUser: newValue });
							},
							submit: this.state.addUser
								? this.addUser.bind(this)
								: this.removeUser.bind(this)
						},
						render: (errors) => ({
							body: [
								new Input({
									label: 'Логин пользователя',
									type: 'text',
									name: 'login',
									value: this.state.actionUser.login,
									error: errors.login
								}),
								new NodeElement({
									tagName: 'div',
									children: [
										new NodeElement({
											tagName: 'br'
										}),
										'Пользователи',
										new UserList({ users })
									]
								})
							],
							footer: new Button({
								text: this.state.addUser ? 'Добавить' : 'Удалить',
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
