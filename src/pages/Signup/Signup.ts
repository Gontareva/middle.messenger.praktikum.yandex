import Form from '../../components/Form';
import List from '../../components/List';
import Input from '../../components/Input';
import Button from '../../components/Button';
import AppLink from '../../components/AppLink';

import Block from '../../utils/Block';
import compile from '../../utils/compile';
import authController from '../../utils/controllers/auth';

import template from 'pageTemplates/Signup.template.js';

export default class SignupPage extends Block {
	constructor() {
		super();

		document.title = 'Регистрация';
	}

	init(): void {
		this.state = {
			login: '',
			password: '',
			email: '',
			first_name: '',
			second_name: '',
			phone: '',
			confirm_password: ''
		};
	}

	onSubmit = (data: Record<string, any>): void => {
		authController.signup(data);
	};

	render(): Element {
		return compile(template, {
			form: new Form({
				schema: {
					email: ['email', 'required'],
					login: ['required'],
					phone: ['phone', 'required'],
					password: ['password', 'required'],
					confirm_password: [
						(password) =>
							password === this.state.password ? null : 'Пароли не совпадают!',
						'required'
					]
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
								label: 'Почта',
								name: 'email',
								type: 'email',
								value: this.state.email,
								error: errors.email
							}),
							new Input({
								label: 'Логин',
								name: 'login',
								type: 'text',
								value: this.state.login,
								error: errors.login
							}),
							new Input({
								label: 'Имя',
								name: 'first_name',
								type: 'text',
								value: this.state.first_name
							}),
							new Input({
								label: 'Фамилия',
								name: 'second_name',
								type: 'text',
								value: this.state.second_name
							}),
							new Input({
								label: 'Телефон',
								name: 'phone',
								type: 'phone',
								value: this.state.phone,
								error: errors.phone
							}),
							new Input({
								label: 'Пароль',
								name: 'password',
								type: 'password',
								value: this.state.password,
								error: errors.password
							}),
							new Input({
								label: 'Пароль (ещё раз)',
								name: 'confirm_password',
								type: 'password',
								value: this.state.confirm_password,
								error: errors.confirm_password
							})
						]
					}),
					footer: new List({
						items: [
							new Button({
								themes: ['primary', 'stretch'],
								type: 'submit',
								text: 'Зарегистрироваться'
							}),
							new AppLink({
								className: 'button button_stretch',
								href: '/login',
								text: 'Войти'
							})
						]
					})
				})
			})
		});
	}
}
