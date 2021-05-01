import Block from '../../utils/Block';
import Avatar from '../Avatar';

import compile from '../../utils/compile';
import { getFormatAccurateDate } from '../../utils/date';
import { prune } from '../../utils/string';

import template from 'componentTemplates/ChatListItem.template.js';

import { IChatListItemProps } from './types';

export default class ChatListItem extends Block {
	readonly props: IChatListItemProps;

	constructor(props: IChatListItemProps) {
		super(props);
	}

	render() {
		const { chat, user } = this.props;

		const unreadMessages = chat.messages.filter(
			({ status }) => status === 'new'
		);
		const lastMessage = chat.messages[0] || {
			publishDate: null,
			text: '',
			fromUserId: null
		};

		return compile(template, {
			avatar: new Avatar({ imageSrc: user.avatar }),
			unreadMessagesCount: unreadMessages.length,
			date:
				lastMessage.publishDate &&
				getFormatAccurateDate(lastMessage.publishDate),
			userName: chat.user.display_name,
			text: prune(lastMessage.text, 100),
			ownLabel: chat.user._id === lastMessage.fromUserId
		});
	}
}
