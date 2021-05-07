import Avatar from '../../components/Avatar';
import Form from '../../components/Form';
import List from '../../components/List';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';

import compile from '../../utils/compile';
import Block from '../../utils/Block';
import userController from '../../utils/controllers/user';
import {
	attachListener,
	detachListener,
	makeSelector
} from '../../utils/Store';
import { IUser } from '../../utils/types';

import template from 'pageTemplates/ChangeProfile.template.js';

export default class ChangeProfilePage extends Block {
	constructor() {
		super();

		document.title = 'Изменить профиль';
	}

	init(): void {
		this.state = { user: {} };
	}

	getUser = (): void => {
		const user = makeSelector((store) => store.user);
		this.setState({ user: user || {} });
	};

	componentDidMount(): void {
		this.getUser();

		attachListener('user', this.getUser);
	}

	componentWillUnmount(): void {
		detachListener('user', this.getUser);
	}

	onSubmit = (data: IUser): void => {
		userController.changeProfile(data);
	};

	changeAvatar(formData: FormData): void {
		userController.changeAvatar(formData);
	}

	render(): Element {
		return compile(template, {
			avatar: new Avatar({
				imageSrc: this.state.user.avatar,
				canChange: true,
				onChange: this.changeAvatar.bind(this)
			}),
			backButton: new BackButton({}),
			form: new Form({
				schema: { email: ['email'], login: ['required'], phone: ['phone'] },
				events: {
					change: (newValue) => {
						this.setState({ user: newValue });
					},
					submit: this.onSubmit
				},
				render: (errors) => ({
					body: new List({
						theme: 'line',
						items: [
							new FormInput({
								title: 'Почта',
								name: 'email',
								value: this.state.user.email,
								error: errors.email
							}),
							new FormInput({
								title: 'Логин',
								name: 'login',
								value: this.state.user.login,
								error: errors.login
							}),
							new FormInput({
								title: 'Имя',
								name: 'first_name',
								value: this.state.user.first_name
							}),
							new FormInput({
								title: 'Фамилия',
								name: 'second_name',
								value: this.state.user.second_name
							}),
							new FormInput({
								title: 'Имя в чате',
								value: this.state.user.display_name,
								name: 'display_name'
							}),
							new FormInput({
								title: 'Телефон',
								name: 'phone',
								value: this.state.user.phone,
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
