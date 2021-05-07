import AppLink from '../../components/AppLink';
import List from '../../components/List';

import compile from '../../utils/compile';
import Block from '../../utils/Block';

import template from 'pageTemplates/Main.template.js';

export default class MainPage extends Block {
	constructor() {
		super();

		document.title = 'Messenger';
	}
	render(): Element {
		return compile(template, {
			list: new List({
				items: [
					new AppLink({
						href: '/login',
						text: 'Страница авторизации'
					}),
					new AppLink({
						href: '/signup',
						text: 'Страница регистрации'
					}),
					new AppLink({
						href: '/profile',
						text: 'Профиль'
					}),
					new AppLink({
						href: '/change-profile',
						text: 'Изменить профиль'
					}),

					new AppLink({
						href: '/change-password',
						text: 'Изменить пароль'
					}),
					new AppLink({
						href: '/chat',
						text: 'Чат'
					}),
					new AppLink({
						href: '/error',
						text: 'Страница ошибки'
					})
				]
			})
		});
	}
}
