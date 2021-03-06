import HTTPTransport from '../HTTPTransport';
import { baseApiUrl, httpProtocol } from '../../../config';
import { escape } from '../../escape';

const authAPIInstance = new HTTPTransport(
	`${httpProtocol}://${baseApiUrl}/api/v2/auth`
);

export class AuthAPI {
	login(data: Record<string, any>) {
		return authAPIInstance.post('/signin', { data });
	}

	signup(data: Record<string, any>) {
		return authAPIInstance.post('/signup', { data });
	}

	logout() {
		return authAPIInstance.post('/logout');
	}

	user() {
		return authAPIInstance
			.get('/user')
			.then(({ response }) => JSON.parse(response));
	}
}

export default AuthAPI;
