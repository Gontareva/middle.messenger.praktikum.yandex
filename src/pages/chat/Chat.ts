import { user, chats } from '../../utils/constants';

import Page from '../../components/Page';
import List from '../../components/List';
import Link from '../../components/Link';
import Element from '../../components/Element';
import Search from '../../components/Search';
import ChatListItem from '../../components/ChatListItem';
import Chat from '../../components/Chat';

import template from 'pageTemplates/Chat.template.js';

let activeChat = chats[0];

function onChatListItemClick(chat) {
	activeChat = chat;

	page.setProps({ activeChat });
}

const page = new Page({
	title: 'Чат',
	template,
	render: () => ({
		sidebar: new List({
			theme: 'line',
			items: [
				{
					modifiers: ['column', 'right'],
					node: new Element({
						tagName: 'span',
						children: [
							new Link({
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
					const isActive = activeChat && activeChat === chat;
					const node = new ChatListItem({
						chat,
						user,
						events: {
							click: () => onChatListItemClick(chat)
						}
					});

					return {
						modifiers: isActive ? ['bright'] : null,
						node
					};
				})
			]
		}),
		body: activeChat
			? new Chat({ chat: activeChat, user })
			: 'Выберите чат, чтобы отправить сообщение'
	})
});

export default page;
