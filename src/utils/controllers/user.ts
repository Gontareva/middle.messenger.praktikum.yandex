import { IUser } from '../types';
import { UserAPI } from '../api/user';
import { dispatch } from '../Store';
import { errorHandler } from '../errorHandler';

export class UserController {
	private userApi: UserAPI;

	constructor() {
		this.userApi = new UserAPI();
	}

	changeProfile(data: IUser): void {
		return dispatch('user', () =>
			this.userApi.changeProfile(data).catch(errorHandler)
		)();
	}

	changeAvatar(data: FormData) {
		return dispatch('user', () =>
			this.userApi
				.changeAvatar(data)
				.then(({ response }) => JSON.parse(response))
				.catch(errorHandler)
		)();
	}

	getUserById(id: number) {
		const promise = this.userApi.getUserById(id);
		promise.catch(errorHandler);

		return promise;
	}

	changePassword(data: Record<string, any>) {
		const promise = this.userApi.changePassword(data);
		promise.catch(errorHandler);

		return promise;
	}

	search(login: string) {
		const promise = this.userApi.search(login);
		promise.catch(errorHandler);

		return promise;
	}
}

export default new UserController();
