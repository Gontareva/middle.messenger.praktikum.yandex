import Form from '../../components/Form';
import List from '../../components/List';
import Input from '../../components/Input';
import Button from '../../components/Button';
import AppLink from '../../components/AppLink';

import Block from '../../utils/Block';
import compile from '../../utils/compile';

import template from 'pageTemplates/Login.template.js';

export default class LoginPage extends Block {
	constructor() {
		super();

		document.title = 'Авторизация';
	}

	init(): void {
		this.state = {
			login: '',
			password: ''
		};
	}

	render(): Element {
		return compile(template, {
			form: new Form({
				schema: {
					login: ['email', 'required'],
					password: ['password', 'required']
				},
				events: {
					change: (newValue) => {
						this.setState(newValue);
					}
				},
				render: (errors) => ({
					body: new List({
						items: [
							new Input({
								label: 'Логин',
								name: 'login',
								type: 'text',
								value: this.state.login,
								error: errors.login
							}),
							new Input({
								label: 'Пароль',
								name: 'password',
								type: 'password',
								value: this.state.password,
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
							new AppLink({
								className: 'button button_stretch',
								href: '/signin',
								text: 'Нет аккаунта?'
							})
						]
					})
				})
			})
		});
	}
}
