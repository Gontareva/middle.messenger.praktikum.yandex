import Block from '../../utils/Block';
import AppLink from '../../components/AppLink';

import compile from '../../utils/compile';
import { errorHash } from '../../utils/constants';

// @ts-ignore
import template from './Error.template';

import './Error.scss';

export default class ErrorPage extends Block {
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
