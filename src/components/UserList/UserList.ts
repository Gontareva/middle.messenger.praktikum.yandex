import Block from '../../utils/Block';
import Avatar from '../Avatar';

import compile from '../../utils/compile';

import template from 'componentTemplates/UserList.template.js';

import { IUserListProps } from './types';

export default class UserList extends Block {
	readonly props: IUserListProps;

	constructor(props: IUserListProps) {
		super(props);
	}

	render() {
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
