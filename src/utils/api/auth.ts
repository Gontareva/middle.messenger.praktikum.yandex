import HTTPTransport from '../http';
import { BaseAPI } from './base';
import { baseApiUrl, httpProtocol } from '../../../config';

const authAPIInstance = new HTTPTransport(
	`${httpProtocol}://${baseApiUrl}/api/v2/auth`
);

export class AuthAPI extends BaseAPI {
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
