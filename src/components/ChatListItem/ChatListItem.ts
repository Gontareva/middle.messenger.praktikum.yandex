import Block from '../../utils/Block';
import Avatar from '../Avatar';
import Button from '../Button';

import compile from '../../utils/compile';
import { getFormatAccurateDate } from '../../utils/date';
import { prune } from '../../utils/string';
import { icons } from '../../utils/constants';

import template from 'componentTemplates/ChatListItem.template.js';

import { IChatListItemProps } from './types';
import { IMessage, IUser } from '../../utils/types';

export default class ChatListItem extends Block {
	readonly props: IChatListItemProps;

	constructor(props: IChatListItemProps) {
		super({
			events: {
				click: (event) => {
					if (!event.target.closest('.chat-list-item button')) {
						props.onItemClick();
					}
				}
			},
			...props
		});
	}

	render() {
		const { chat, user } = this.props;

		const lastMessage: IMessage = {
			content: 'Чат пуст',
			user: {} as IUser,
			...chat.last_message
		};
		const ownMessage = user.id === lastMessage.created_by;
		const avatar = ownMessage ? user.avatar : lastMessage.user.avatar;

		return compile(template, {
			avatar: new Avatar({ imageSrc: avatar }),
			unreadMessagesCount: chat.unread_count,
			date: lastMessage.time && getFormatAccurateDate(lastMessage.time),
			userName: chat.title,
			text: prune(lastMessage.content, 100),
			ownLabel: ownMessage,
			closeButton: new Button({
				events: {
					click: () => this.props.deleteChat(chat.id)
				},
				themes: ['simple'],
				icon: icons.close
			})
		});
	}
}
