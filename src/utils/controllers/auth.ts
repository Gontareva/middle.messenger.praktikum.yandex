import { AuthAPI } from '../api/auth';
import { router } from '../Router';
import { dispatch } from '../Store';
import { errorHandler } from '../errorHandler';
import chatController from './chat';
import { escapeObject, unescapeObject } from '../../escape';

export class AuthController {
	private authApi: AuthAPI;

	constructor() {
		this.authApi = new AuthAPI();
	}

	login(data: Record<string, any>) {
		const promise = this.authApi.login(escapeObject(data));
		promise
			.then(() => {
				this.user().then(() => {
					chatController.request().then(() => router.go('/chat'));
				});
			})
			.catch(errorHandler);

		return promise;
	}

	signup(data: Record<string, any>) {
		const promise = this.authApi.signup(escapeObject(data));
		promise
			.then(() => {
				router.go('/login');
			})
			.catch(errorHandler);

		return promise;
	}

	logout() {
		const promise = this.authApi.logout();
		promise
			.then(() => {
				router.go('/login');
			})
			.catch(errorHandler);

		return promise;
	}

	user() {
		return dispatch('user', () => this.authApi.user().then(unescapeObject))();
	}
}

export default new AuthController();
