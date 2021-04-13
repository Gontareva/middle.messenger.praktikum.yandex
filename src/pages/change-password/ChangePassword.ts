import { user } from '../../utils/constants';

import Page from '../../components/Page';
import Avatar from '../../components/Avatar';
import Form from '../../components/Form';
import List from '../../components/List';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';

import template from 'pageTemplates/ChangePassword.template.js';

let values = {
	oldPassword: '',
	newPassword: '',
	check: ''
};

export default new Page({
	title: 'Изменить пароль',
	template,
	render: () => ({
		avatar: new Avatar({
			imageSrc: user.avatar
		}),
		backButton: new BackButton({}),
		form: new Form({
			schema: {
				oldPassword: ['required'],
				newPassword: ['password', 'required'],
				check: [
					(password) =>
						password === values.newPassword ? null : 'Пароли не совпадают!',
					'required'
				]
			},
			events: {
				change: (newValue) => {
					values = newValue;
				}
			},
			render: (errors) => ({
				body: new List({
					theme: 'line',
					items: [
						new FormInput({
							title: 'Старый пароль',
							type: 'password',
							name: 'oldPassword',
							value: values.oldPassword,
							error: errors.oldPassword
						}),
						new FormInput({
							title: 'Новый пароль',
							type: 'password',
							name: 'newPassword',
							value: values.newPassword,
							error: errors.newPassword
						}),
						new FormInput({
							title: 'Повторите новый пароль',
							type: 'password',
							name: 'check',
							value: values.check,
							error: errors.check
						})
					]
				}),
				footer: new Button({
					themes: ['primary', 'wide'],
					type: 'submit',
					text: 'Сохранить'
				})
			})
		})
	})
});
