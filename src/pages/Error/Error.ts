import AppLink from '../../components/AppLink';

import compile from '../../utils/compile';
import Block from '../../utils/Block';

import template from 'pageTemplates/Error.template.js';

export default class ErrorPage extends Block {
	constructor() {
		super();

		document.title = 'Ошибка';
	}

	render(): Element {
		return compile(template, {
			code: 404,
			message: 'Не туда попали',
			backLink: new AppLink({
				href: '/chat',
				text: 'Назад к чатам'
			})
		});
	}
}
