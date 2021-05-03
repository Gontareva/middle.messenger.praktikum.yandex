import Avatar from '../../components/Avatar';
import BackButton from '../../components/BackButton';
import Form from '../../components/Form';
import List from '../../components/List';
import AppLink from '../../components/AppLink';
import FormInput from '../../components/FormInput';

import Block from '../../utils/Block';
import compile from '../../utils/compile';
import { user } from '../../utils/constants';

import template from 'pageTemplates/Profile.template.js';

export default class ProfilePage extends Block {
	constructor() {
		super();

		document.title = 'Профиль';
	}

	render(): Element {
		return compile(template, {
			title: user.display_name,
			avatar: new Avatar({
				imageSrc: user.avatar
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
								value: user.email,
								name: 'email',
								readOnly: true
							}),
							new FormInput({
								title: 'Логин',
								value: user.login,
								name: 'login',
								readOnly: true
							}),
							new FormInput({
								title: 'Имя',
								value: user.first_name,
								name: 'first_name',
								readOnly: true
							}),
							new FormInput({
								title: 'Фамилия',
								value: user.second_name,
								name: 'second_name',
								readOnly: true
							}),
							new FormInput({
								title: 'Имя в чате',
								value: user.display_name,
								name: 'display_name',
								readOnly: true
							}),
							new FormInput({
								title: 'Телефон',
								value: user.phone,
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
