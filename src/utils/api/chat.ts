import HTTPTransport from '../http';
import { BaseAPI } from './base';
import { baseApiUrl, httpProtocol } from '../../../config';

const chatAPIInstance = new HTTPTransport(
	`${httpProtocol}://${baseApiUrl}/api/v2/chats`
);

export default class ChatAPI extends BaseAPI {
	create(data: Record<string, any>): Promise<unknown> | never {
		return chatAPIInstance.post('', { data });
	}

	request() {
		return chatAPIInstance.get('').then(({ response }) =>
			JSON.parse(response).map(({ last_message, ...chat }) => ({
				...chat,
				last_message: JSON.parse(last_message)
			}))
		);
	}

	delete(id: number) {
		return chatAPIInstance.delete('', { data: { chatId: id } });
	}

	token(id: number) {
		return chatAPIInstance
			.post(`/token/${id}`)
			.then(({ response }) => JSON.parse(response).token);
	}

	getUsers(chatId: number): Promise<unknown> {
		return chatAPIInstance
			.get(`/${chatId}/users`)
			.then(({ response }) => JSON.parse(response));
	}

	addUser(userId: number, chatId: number): Promise<unknown> {
		return chatAPIInstance.put('/users', { data: { users: [userId], chatId } });
	}

	removeUser(userId: number, chatId: number): Promise<unknown> {
		return chatAPIInstance.delete('/users', {
			data: { users: [userId], chatId }
		});
	}
}
