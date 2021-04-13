import Page from '../../components/Page';
import Form from '../../components/Form';
import List from '../../components/List';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Link from '../../components/Link';

import template from 'pageTemplates/Signin.template.js';

let values = {
	login: '',
	password: '',
	email: '',
	first_name: '',
	second_name: '',
	phone: '',
	confirm_password: ''
};

export default new Page({
	title: 'Регистрация',
	template,
	render: () => ({
		form: new Form({
			schema: {
				email: ['email', 'required'],
				login: ['email', 'required'],
				phone: ['phone', 'required'],
				password: ['password', 'required'],
				confirm_password: [
					(password) =>
						password === values.password ? null : 'Пароли не совпадают!',
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
					items: [
						new Input({
							label: 'Почта',
							name: 'email',
							type: 'email',
							value: values.email,
							error: errors.email
						}),
						new Input({
							label: 'Логин',
							name: 'login',
							type: 'text',
							value: values.login,
							error: errors.login
						}),
						new Input({
							label: 'Имя',
							name: 'first_name',
							type: 'text',
							value: values.first_name
						}),
						new Input({
							label: 'Фамилия',
							name: 'second_name',
							type: 'text',
							value: values.second_name
						}),
						new Input({
							label: 'Телефон',
							name: 'phone',
							type: 'phone',
							value: values.phone,
							error: errors.phone
						}),
						new Input({
							label: 'Пароль',
							name: 'password',
							type: 'password',
							value: values.password,
							error: errors.password
						}),
						new Input({
							label: 'Пароль (ещё раз)',
							name: 'confirm_password',
							type: 'password',
							value: values.confirm_password,
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
						new Link({
							className: 'button button_stretch',
							href: '/login',
							text: 'Войти'
						})
					]
				})
			})
		})
	})
});
