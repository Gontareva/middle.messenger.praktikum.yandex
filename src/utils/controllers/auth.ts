import { AuthAPI } from '../api/auth';
import { router } from '../Router';
import { dispatch } from '../Store';

export class AuthController {
	private authApi: AuthAPI;

	constructor() {
		this.authApi = new AuthAPI();
	}

	login(data: Record<string, any>) {
		return this.authApi.login(data).then(() => {
			router.go('/chat');
		});
	}

	signup(data: Record<string, any>) {
		return this.authApi.signup(data).then(() => {
			router.go('/login');
		});
	}

	logout() {
		return this.authApi.logout().then(() => {
			router.go('/login');
		});
	}

	user() {
		return dispatch('user', this.authApi.user)();
	}
}

export default new AuthController();
