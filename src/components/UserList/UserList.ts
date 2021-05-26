import Block from '../../utils/Block';
import Avatar from '../Avatar';

import compile from '../../utils/compile';

// @ts-ignore
import template from './UserList.template';

import { IUserListProps } from './types';

import './UserList.scss';

export default class UserList extends Block {
	readonly props: IUserListProps;

	constructor(props: IUserListProps) {
		super(props);
	}

	render(): Element {
		const { users = [] } = this.props;

		return compile(template, {
			users: users.map((user) => ({
				avatar: new Avatar({
					imageSrc: user.avatar
				}),
				title: `${user.first_name} ${user.second_name}`,
				subtitle: user.login
			}))
		});
	}
}
