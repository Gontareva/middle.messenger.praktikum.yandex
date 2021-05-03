import List from '../../components/List';
import AppLink from '../../components/AppLink';
import NodeElement from '../../components/Element';
import Search from '../../components/Search';
import ChatListItem from '../../components/ChatListItem';
import Chat from '../../components/Chat';

import compile from '../../utils/compile';
import Block from '../../utils/Block';
import { user, chats } from '../../utils/constants';
import { IChat } from '../../utils/types';

import template from 'pageTemplates/Chat.template.js';

export default class ChatPage extends Block {
	constructor() {
		super();

		document.title = 'Чат';
	}

	init(): void {
		this.state = {
			activeChat: null
		};
	}

	onChatListItemClick = (chat: IChat): void => {
		this.setState({ activeChat: chat });
	};

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
								new AppLink({
									themes: ['gray', 'arrow'],
									className: 'list__sub-item list__sub-item_align_right',
									href: '/profile',
									text: 'Профиль'
								}),
								new Search({})
							]
						})
					},
					...chats.map((chat) => {
						const isActive =
							this.state.activeChat && this.state.activeChat === chat;
						const node = new ChatListItem({
							chat,
							user,
							events: {
								click: () => this.onChatListItemClick(chat)
							}
						});

						return {
							modifiers: isActive ? ['bright'] : null,
							node
						};
					})
				]
			}),
			body: this.state.activeChat
				? new Chat({ chat: this.state.activeChat, user })
				: 'Выберите чат, чтобы отправить сообщение'
		});
	}
}
