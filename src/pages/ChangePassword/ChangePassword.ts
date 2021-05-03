import Avatar from '../../components/Avatar';
import Form from '../../components/Form';
import List from '../../components/List';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';

import Block from '../../utils/Block';
import compile from '../../utils/compile';
import { user } from '../../utils/constants';

import template from 'pageTemplates/ChangePassword.template.js';

export default class ChangePasswordPage extends Block {
	constructor() {
		super();

		document.title = 'Изменить пароль';
	}

	init(): void {
		this.state = {
			oldPassword: '',
			newPassword: '',
			check: ''
		};
	}

	render(): Element {
		return compile(template, {
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
							password === this.state.newPassword
								? null
								: 'Пароли не совпадают!',
						'required'
					]
				},
				events: {
					change: (newValue) => {
						this.setState(newValue);
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
								value: this.state.oldPassword,
								error: errors.oldPassword
							}),
							new FormInput({
								title: 'Новый пароль',
								type: 'password',
								name: 'newPassword',
								value: this.state.newPassword,
								error: errors.newPassword
							}),
							new FormInput({
								title: 'Повторите новый пароль',
								type: 'password',
								name: 'check',
								value: this.state.check,
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
		});
	}
}
