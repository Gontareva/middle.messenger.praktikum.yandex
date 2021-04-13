import Page from '../../components/Page';
import Link from '../../components/Link';
import List from '../../components/List';

import template from 'pageTemplates/Main.template.js';

const page = new Page({
	title: 'Messenger',
	template,
	render: () => ({
		list: new List({
			items: [
				new Link({
					href: '/login',
					text: 'Страница авторизации'
				}),
				new Link({
					href: '/signin',
					text: 'Страница регистрации'
				}),
				new Link({
					href: '/profile',
					text: 'Профиль'
				}),
				new Link({
					href: '/change-profile',
					text: 'Изменить профиль'
				}),

				new Link({
					href: '/change-password',
					text: 'Изменить пароль'
				}),
				new Link({
					href: '/chat',
					text: 'Чат'
				}),
				new Link({
					href: '/error',
					text: 'Страница ошибки'
				})
			]
		})
	})
});

export default page;
