import List from '../../components/List';
import AppLink from '../../components/AppLink';
import NodeElement from '../../components/Element';
import Search from '../../components/Search';
import ChatListItem from '../../components/ChatListItem';
import Chat from '../../components/Chat';
import Modal from '../../components/Modal';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Button from '../../components/Button';

import compile from '../../utils/compile';
import Block from '../../utils/Block';
import { IChat } from '../../utils/types';
import chatController from '../../utils/controllers/chat';
import {
	attachListener,
	detachListener,
	makeSelector
} from '../../utils/Store';

import template from 'pageTemplates/Chat.template.js';

export default class ChatPage extends Block {
	constructor() {
		super({
			chats: []
		});

		document.title = 'Чат';
	}

	init(): void {
		this.state = {
			activeChat: null,
			modalIsOpen: false,
			newChat: { title: '' }
		};
	}

	getUser = (): void => {
		const user = makeSelector((store) => store.user);
		this.setProps({ user: user || {} });
	};

	getChats = (): void => {
		const chats = makeSelector((store) => store.chats);
		this.setProps({ chats: chats || [] });
	};

	componentDidMount(): void {
		this.getUser();

		attachListener('user', this.getUser);
		attachListener('chats', this.getChats);
	}

	componentWillUnmount(): void {
		detachListener('user', this.getUser);
		detachListener('chats', this.getChats);
	}

	onChatListItemClick = (chat: IChat): void => {
		this.setState({ activeChat: chat });
	};

	toggleModal = (): void => {
		this.setState({ modalIsOpen: !this.state.modalIsOpen });
	};

	createChat(): void {
		chatController.create({ title: this.state.newChat.title }).then(() => {
			this.setState({ modalIsOpen: false });
		});
	}

	deleteChat(id: number): void {
		chatController.delete(id);
	}

	render(): Element {
		return compile(template, {
			sidebar: new List({
				theme: 'line',
				items: [
					{
						modifiers: ['column', 'right'],
						node: new NodeElement({
							tagName: 'span',
							children: [
								new Button({
									themes: ['gray'],
									className: 'list__sub-item list__sub-item_align_left',
									text: 'Создать чат',
									events: {
										click: this.toggleModal
									}
								}),
								new AppLink({
									themes: ['gray', 'arrow'],
									className: 'list__sub-item list__sub-item_align_right',
									href: '/profile',
									text: 'Профиль'
								}),
								new Search()
							]
						})
					},
					...this.props.chats.map((chat) => {
						const isActive =
							this.state.activeChat && this.state.activeChat === chat;
						const node = new ChatListItem({
							chat,
							user: this.props.user,
							onItemClick: () => this.onChatListItemClick(chat),
							deleteChat: this.deleteChat.bind(this)
						});

						return {
							modifiers: isActive ? ['bright'] : null,
							node
						};
					})
				]
			}),
			body: this.state.activeChat
				? new Chat({ chat: this.state.activeChat, user: this.props.user })
				: 'Выберите чат, чтобы отправить сообщение',
			modal: new Modal({
				isOpen: this.state.modalIsOpen,
				onCloseButtonClick: this.toggleModal,
				render: () => ({
					header: 'Создание чата',
					children: new Form({
						schema: {
							title: ['required']
						},
						events: {
							change: (newValue) => {
								this.setState({ newChat: newValue });
							},
							submit: this.createChat.bind(this)
						},
						render: (errors) => ({
							body: new Input({
								label: 'Название чата',
								type: 'text',
								name: 'title',
								value: this.state.newChat.title,
								error: errors.title
							}),
							footer: new Button({
								text: 'Создать чат',
								type: 'submit',
								themes: ['primary']
							})
						})
					})
				})
			})
		});
	}
}
