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
		return this.userApi.getUserById(id).catch(errorHandler);
	}

	changePassword(data: Record<string, any>) {
		return this.userApi.changePassword(data).catch(errorHandler);
	}

	search(login: string) {
		return this.userApi.search(login).catch(errorHandler);
	}
}

export default new UserController();
