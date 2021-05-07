import Block from '../../utils/Block';
import AppLink from '../../components/AppLink';

import compile from '../../utils/compile';
import { errorHash } from '../../utils/constants';

import template from 'pageTemplates/Error.template.js';

export default class ErrorPage extends Block {
	constructor(props) {
		super(props);

		document.title = 'Ошибка';
	}

	render(): Element {
		const code =
			this.props.code || +window.location.hash.replace('#', '') || 404;

		return compile(template, {
			code,
			message: errorHash[code],
			backLink: new AppLink({
				href: code === 401 ? '/login' : '/chat',
				text: code === 401 ? 'Попробовать' : 'Назад к чатам'
			})
		});
	}
}
