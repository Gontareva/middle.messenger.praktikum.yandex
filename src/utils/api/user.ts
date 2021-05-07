import HTTPTransport from '../http';
import { BaseAPI } from './base';
import { baseApiUrl, httpProtocol } from '../../../config';
import { IUser } from '../types';

const userAPIInstance = new HTTPTransport(
	`${httpProtocol}://${baseApiUrl}/api/v2/user`
);

export class UserAPI extends BaseAPI {
	changeProfile(data: IUser) {
		return userAPIInstance
			.put('/profile', { data })
			.then(({ response }) => JSON.parse(response));
	}

	changeAvatar(data: FormData) {
		return userAPIInstance.put('/profile/avatar', {
			data,
			isFormData: true
		});
	}

	getUserById(id: number) {
		return userAPIInstance.post(`/${id}`);
	}

	changePassword(data: Record<string, any>) {
		return userAPIInstance.put('/password', { data });
	}

	search(login: string) {
		return userAPIInstance
			.post('/search', { data: { login } })
			.then(({ response }) => JSON.parse(response));
	}
}

export default UserAPI;
