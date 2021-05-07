import HTTPTransport from '../http';
import { baseApiUrl } from '../../../config';
import { IUser } from '../types';
import { UserAPI } from '../api/user';
import { dispatch } from '../Store';

const userController = new HTTPTransport(`${baseApiUrl}/api/v2/user`);

export class UserController {
	private userApi: UserAPI;

	constructor() {
		this.userApi = new UserAPI();
	}

	changeProfile(data: IUser): void {
		return dispatch('user', () => this.userApi.changeProfile(data))();
	}

	changeAvatar(data: FormData) {
		return userController.put('/profile/avatar', { data });
	}

	getUserById(id: number) {
		return userController.post(`/${id}`);
	}

	changePassword(data: Record<string, any>) {
		return this.userApi.changePassword(data);
	}

	search(login: string) {
		return userController.get('/user', { data: { login } });
	}
}

export default new UserController();
