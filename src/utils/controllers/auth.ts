import { AuthAPI } from '../api/auth';
import { router } from '../Router';
import { dispatch } from '../Store';
import { errorHandler } from '../errorHandler';
import chatController from './chat';

export class AuthController {
	private authApi: AuthAPI;

	constructor() {
		this.authApi = new AuthAPI();
	}

	login(data: Record<string, any>) {
		return this.authApi
			.login(data)
			.then(() => {
				this.user().then(() => {
					chatController.request().then(() => router.go('/chat'));
				});
			})
			.catch(errorHandler);
	}

	signup(data: Record<string, any>) {
		return this.authApi
			.signup(data)
			.then(() => {
				router.go('/login');
			})
			.catch(errorHandler);
	}

	logout() {
		return this.authApi
			.logout()
			.then(() => {
				router.go('/login');
			})
			.catch(errorHandler);
	}

	user() {
		return dispatch('user', () => this.authApi.user())();
	}
}

export default new AuthController();
