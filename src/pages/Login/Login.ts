import Form from '../../components/Form';
import List from '../../components/List';
import Input from '../../components/Input';
import Button from '../../components/Button';
import AppLink from '../../components/AppLink';

import Block from '../../utils/Block';
import compile from '../../utils/compile';
import authController from '../../utils/controllers/auth';

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

	onSubmit = (data: Record<string, any>): void => {
		authController.login(data);
	};

	render(): Element {
		return compile(template, {
			form: new Form({
				schema: {
					login: ['required'],
					password: ['password', 'required']
				},
				events: {
					change: (newValue) => {
						this.setState(newValue);
					},
					submit: this.onSubmit
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
								href: '/signup',
								text: 'Нет аккаунта?'
							})
						]
					})
				})
			})
		});
	}
}
