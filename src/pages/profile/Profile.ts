import { user } from '../../utils/constants';

import Avatar from '../../components/Avatar';
import BackButton from '../../components/BackButton';
import Form from '../../components/Form';
import List from '../../components/List';
import Link from '../../components/Link';
import FormInput from '../../components/FormInput';
import Page from '../../components/Page';

import template from 'pageTemplates/Profile.template.js';

export default new Page({
	title: 'Профиль',
	template,
	render: () => ({
		title: user.display_name,
		avatar: new Avatar({
			imageSrc: user.avatar
		}),
		backButton: new BackButton({}),
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
						new Link({
							href: '/change-profile',
							text: 'Изменить данные'
						}),
						new Link({
							href: '/change-password',
							text: 'Изменить пароль'
						}),
						new Link({
							themes: ['bright'],
							href: '/logout',
							text: 'Выйти'
						})
					]
				})
			})
		})
	})
});
