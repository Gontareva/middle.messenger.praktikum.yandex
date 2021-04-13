import { user } from '../../utils/constants';

import Page from '../../components/Page';
import Avatar from '../../components/Avatar';
import Form from '../../components/Form';
import List from '../../components/List';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';

import template from 'pageTemplates/ChangeProfile.template.js';

let values = user;

export default new Page({
	title: 'Изменить профиль',
	template,
	render: () => ({
		avatar: new Avatar({
			imageSrc: user.avatar
		}),
		backButton: new BackButton({}),
		form: new Form({
			schema: { email: ['email'], login: ['email'], phone: ['phone'] },
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
							title: 'Почта',
							name: 'email',
							value: values.email,
							error: errors.email
						}),
						new FormInput({
							title: 'Логин',
							name: 'login',
							value: values.login,
							error: errors.login
						}),
						new FormInput({
							title: 'Имя',
							name: 'first_name',
							value: values.first_name
						}),
						new FormInput({
							title: 'Фамилия',
							name: 'second_name',
							value: values.second_name
						}),
						new FormInput({
							title: 'Имя в чате',
							value: values.display_name,
							name: 'display_name'
						}),
						new FormInput({
							title: 'Телефон',
							name: 'phone',
							value: values.phone,
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
	})
});
