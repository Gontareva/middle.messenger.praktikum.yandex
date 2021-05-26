import { IUser } from '../types';
import { UserAPI } from '../api/user';
import { dispatch } from '../Store';
import { errorHandler } from '../errorHandler';
import { escape, escapeObject, unescapeObject } from '../escape';

export class UserController {
	private userApi: UserAPI;

	constructor() {
		this.userApi = new UserAPI();
	}

	changeProfile(data: IUser): void {
		return dispatch('user', () => {
			const promise = this.userApi.changeProfile(escapeObject(data));

			promise.then(unescapeObject).catch(errorHandler);

			return promise;
		})();
	}

	changeAvatar(data: FormData) {
		return dispatch('user', () =>
			this.userApi
				.changeAvatar(data)
				.then(({ response }) => unescapeObject(JSON.parse(response)))
				.catch(errorHandler)
		)();
	}

	getUserById(id: number) {
		const promise = this.userApi.getUserById(id);
		promise.catch(errorHandler);

		return promise;
	}

	changePassword(data: Record<string, string>) {
		const promise = this.userApi.changePassword(escapeObject(data));
		promise.then(unescapeObject).catch(errorHandler);

		return promise;
	}

	search(login: string) {
		const promise = this.userApi.search(escape(login));
		promise.catch(errorHandler);

		return promise;
	}
}

export default new UserController();
