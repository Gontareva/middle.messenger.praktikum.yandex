import Avatar from '../../components/Avatar';
import Form from '../../components/Form';
import List from '../../components/List';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';

import compile from '../../utils/compile';
import Block from '../../utils/Block';
import { user } from '../../utils/constants';

import template from 'pageTemplates/ChangeProfile.template.js';

export default class ChangeProfilePage extends Block {
	constructor() {
		super();

		document.title = 'Изменить профиль';
	}

	init(): void {
		this.state = { ...user };
	}

	render(): Element {
		return compile(template, {
			avatar: new Avatar({
				imageSrc: user.avatar
			}),
			backButton: new BackButton({}),
			form: new Form({
				schema: { email: ['email'], login: ['email'], phone: ['phone'] },
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
								title: 'Почта',
								name: 'email',
								value: this.state.email,
								error: errors.email
							}),
							new FormInput({
								title: 'Логин',
								name: 'login',
								value: this.state.login,
								error: errors.login
							}),
							new FormInput({
								title: 'Имя',
								name: 'first_name',
								value: this.state.first_name
							}),
							new FormInput({
								title: 'Фамилия',
								name: 'second_name',
								value: this.state.second_name
							}),
							new FormInput({
								title: 'Имя в чате',
								value: this.state.display_name,
								name: 'display_name'
							}),
							new FormInput({
								title: 'Телефон',
								name: 'phone',
								value: this.state.phone,
								error: errors.phone
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
