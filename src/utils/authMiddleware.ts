import ErrorPage from '../pages/Error';
import { getState } from './Store';
import Block from './Block';

class AuthErrorPage extends ErrorPage {
	constructor() {
		super({
			code: 401
		});
	}
}

export function auth(block): { new (): Block } {
	const { user = {} } = getState();

	if (user.id) {
		return block;
	}

	return AuthErrorPage;
}
