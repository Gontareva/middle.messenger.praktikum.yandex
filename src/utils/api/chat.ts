import HTTPTransport from '../HTTPTransport';
import { baseApiUrl, httpProtocol } from '../../../config';
import { errorHandler } from '../errorHandler';

const chatAPIInstance = new HTTPTransport(
	`${httpProtocol}://${baseApiUrl}/api/v2/chats`
);

export default class ChatAPI {
	create(data: Record<string, any>): Promise<unknown> | never {
		return chatAPIInstance.post('', { data }).catch(errorHandler);
	}

	request(data = {}) {
		return chatAPIInstance.get('', { data }).then(({ response }) =>
			JSON.parse(response).map(({ last_message, ...chat }) => ({
				...chat,
				last_message: JSON.parse(last_message)
			}))
		);
	}

	delete(id: number) {
		return chatAPIInstance
			.delete('', { data: { chatId: id } })
			.catch(errorHandler);
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
		return chatAPIInstance
			.put('/users', { data: { users: [userId], chatId } })
			.catch(errorHandler);
	}

	removeUser(userId: number, chatId: number): Promise<unknown> {
		return chatAPIInstance
			.delete('/users', {
				data: { users: [userId], chatId }
			})
			.catch(errorHandler);
	}
}
