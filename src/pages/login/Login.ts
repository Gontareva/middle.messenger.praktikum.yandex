import Form from '../../components/Form';
import List from '../../components/List';
import Page from '../../components/Page';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Link from '../../components/Link';

import template from 'pageTemplates/Login.template.js';

let values = {
	login: '',
	password: ''
};

export default new Page({
	title: 'Авторизация',
	template,
	render: () => ({
		form: new Form({
			schema: {
				login: ['email', 'required'],
				password: ['password', 'required']
			},
			events: {
				change: (newValue) => {
					values = newValue;
				}
			},
			render: (errors) => ({
				body: new List({
					items: [
						new Input({
							label: 'Логин',
							name: 'login',
							type: 'text',
							value: values.login,
							error: errors.login
						}),
						new Input({
							label: 'Пароль',
							name: 'password',
							type: 'password',
							value: values.password,
							error: errors.password
						})
					]
				}),
				footer: new List({
					items: [
						new Button({
							themes: ['primary', 'stretch'],
							type: 'submit',
							text: 'Авторизоваться'
						}),
						new Link({
							className: 'button button_stretch',
							href: '/signin',
							text: 'Нет аккаунта?'
						})
					]
				})
			})
		})
	})
});
