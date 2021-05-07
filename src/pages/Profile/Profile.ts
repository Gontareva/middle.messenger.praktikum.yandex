import Avatar from '../../components/Avatar';
import BackButton from '../../components/BackButton';
import Form from '../../components/Form';
import List from '../../components/List';
import AppLink from '../../components/AppLink';
import FormInput from '../../components/FormInput';

import Block from '../../utils/Block';
import compile from '../../utils/compile';
import {
	makeSelector,
	attachListener,
	detachListener
} from '../../utils/Store';
import userController from '../../utils/controllers/user';
import deepCopy from '../../utils/deepCopy';

import template from 'pageTemplates/Profile.template.js';

export default class ProfilePage extends Block {
	constructor() {
		super();

		document.title = 'Профиль';
	}

	init(): void {
		this.setProps({ user: {} });

		this.getUser();
		attachListener('user', this.getUser.bind(this));
	}

	getUser(): void {
		const user = makeSelector((store) => store.user);
		this.setProps({ user: deepCopy(user) || {} });
	}

	componentWillUnmount(): void {
		detachListener('user', this.getUser.bind(this));
	}

	changeAvatar(formData: FormData): void {
		userController.changeAvatar(formData);
	}

	render(): Element {
		return compile(template, {
			title: this.props.user.display_name,
			avatar: new Avatar({
				imageSrc: this.props.user.avatar,
				canChange: true,
				onChange: this.changeAvatar.bind(this)
			}),
			backButton: new BackButton(),
			form: new Form({
				render: () => ({
					className: 'page__form',
					body: new List({
						theme: 'line',
						items: [
							new FormInput({
								title: 'Почта',
								value: this.props.user.email,
								name: 'email',
								readOnly: true
							}),
							new FormInput({
								title: 'Логин',
								value: this.props.user.login,
								name: 'login',
								readOnly: true
							}),
							new FormInput({
								title: 'Имя',
								value: this.props.user.first_name,
								name: 'first_name',
								readOnly: true
							}),
							new FormInput({
								title: 'Фамилия',
								value: this.props.user.second_name,
								name: 'second_name',
								readOnly: true
							}),
							new FormInput({
								title: 'Имя в чате',
								value: this.props.user.display_name,
								name: 'display_name',
								readOnly: true
							}),
							new FormInput({
								title: 'Телефон',
								value: this.props.user.phone,
								name: 'phone',
								readOnly: true
							})
						]
					}),
					footer: new List({
						theme: 'line',
						items: [
							new AppLink({
								href: '/change-profile',
								text: 'Изменить данные'
							}),
							new AppLink({
								href: '/change-password',
								text: 'Изменить пароль'
							}),
							new AppLink({
								themes: ['bright'],
								href: '/logout',
								text: 'Выйти'
							})
						]
					})
				})
			})
		});
	}
}
