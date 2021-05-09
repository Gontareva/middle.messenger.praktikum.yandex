import ChatAPI from '../api/chat';
import { dispatch, makeSelector } from '../Store';
import { baseApiUrl, wsProtocol } from '../../../config';
import UserAPI from '../api/user';
import { errorHandler } from '../errorHandler';
import ResourcesAPI from '../api/resources';
import { union } from '../union';
import { IChat, IUser } from '../types';

class ChatController {
	private chatApi: ChatAPI;
	private sockets: Record<string, WebSocket>;
	private tokens: Record<string, string>;
	private userApi: UserAPI;
	private resourcesAPI: ResourcesAPI;

	constructor() {
		this.chatApi = new ChatAPI();
		this.userApi = new UserAPI();
		this.resourcesAPI = new ResourcesAPI();

		this.sockets = {};
		this.tokens = {};
	}

	create(data) {
		const promise = this.chatApi.create(data);
		promise.then(() => this.request().catch(errorHandler));

		return promise;
	}

	request(data?: Record<string, any>) {
		return dispatch('chats', () => {
			const promise = this.chatApi.request(data);
			promise.catch(errorHandler);

			return promise;
		})();
	}

	delete(id: number) {
		const promise = this.chatApi.delete(id);
		promise.then(() => this.request()).catch(errorHandler);

		return promise;
	}

	initChat(userId: number, chatId: number) {
		const promise = this.getChat(userId, chatId);
		promise
			.then(() => {
				this.getOldMessage(userId, chatId, 0);
			})
			.catch(errorHandler);

		return promise;
	}

	getChat(userId: number, chatId: number): Promise<WebSocket> {
		return new Promise((resolve, reject) => {
			const token = this.tokens[chatId];

			if (!token) {
				return this.chatApi
					.token(chatId)
					.then((newToken) => {
						this.tokens[chatId] = newToken;
						return this.createChatSocket(userId, chatId, newToken).then(
							resolve
						);
					})
					.catch(reject);
			}

			return this.createChatSocket(userId, chatId, token).then(resolve);
		});
	}

	getOldMessage(userId: number, chatId: number, skip: number) {
		return this.getSocket(userId, chatId).then((socket) =>
			socket.send(
				JSON.stringify({
					content: skip.toString(),
					type: 'get old'
				})
			)
		);
	}

	getSocket(userId: number, chatId: number): Promise<WebSocket> {
		return new Promise((resolve, reject) => {
			const socket = this.sockets[chatId];

			if (!socket) {
				return this.getChat(userId, chatId).then(resolve).catch(reject);
			}

			return resolve(socket);
		});
	}

	sendMessage(userId: number, chatId: number, content: string) {
		return this.getSocket(userId, chatId).then((socket: WebSocket) => {
			socket.send(
				JSON.stringify({
					content,
					type: 'message'
				})
			);
		});
	}

	/* eslint-disable no-console */
	createChatSocket(userId: number, chatId: number, token: string) {
		return new Promise((resolve, reject) => {
			const socket = new WebSocket(
				`${wsProtocol}://${baseApiUrl}/ws/chats/${userId}/${chatId}/${token}`
			);

			socket.addEventListener('open', () => {
				console.log('Соединение установлено');

				this.sockets[chatId] = socket;

				resolve(socket);
			});

			socket.addEventListener('close', (event) => {
				if (event.wasClean) {
					console.log('Соединение закрыто чисто');
				} else {
					console.log('Обрыв соединения');
				}

				console.log(`Код: ${event.code} | Причина: ${event.reason}`);

				this.sockets[chatId] = null;
			});

			socket.addEventListener('message', (event) => {
				console.log('Получены данные', event.data);

				let data = JSON.parse(event.data) || [];
				data = Array.isArray(data) ? data : [data];
				data = data.map(({ time, ...message }) => ({
					...message,
					time: new Date(time)
				}));
				const messages = makeSelector(
					(state) => state.messages || {},
					(obj) => obj[chatId] || []
				);

				dispatch(`messages`, () => ({
					[chatId]: union(messages, data, 'id')
				}))();
			});

			socket.addEventListener('error', (event: ErrorEvent) => {
				console.log('Ошибка', event.message);

				reject(event.message);
			});
		});
	}

	/* eslint-enable no-console */

	addUser(login: string, chatId: number) {
		const promise = this.userApi.search(login);
		promise
			.then((users) => {
				const user = users.find(({ login: userLogin }) => login === userLogin);

				if (user) {
					return this.chatApi.addUser(user.id, chatId);
				}

				throw new Error('Пользователь не найден');
			})
			.then(() => this.getUsers(chatId))
			.catch(errorHandler);

		return promise;
	}

	removeUser(login: string, chatId: number) {
		const chat = this.chatSelector(chatId) as IChat;

		const promise = this.userApi.search(login);
		promise
			.then((users: IUser[]) => {
				const user = users.find(
					({ id, login: userLogin }) =>
						id !== chat.created_by && login === userLogin
				);

				if (user) {
					return this.chatApi.removeUser(user.id, chatId);
				}
			})
			.then(() => this.getUsers(chatId))
			.catch(errorHandler);

		return promise;
	}

	chatSelector(chatId: number): IChat {
		const chats = makeSelector((state) => state.chats || {}) as IChat[];
		return chats.find(({ id }) => id === chatId);
	}

	getUsers(chatId: number) {
		return dispatch('chats', () =>
			this.chatApi.getUsers(chatId).then((users: IUser[]) => {
				const chats = makeSelector((state) => state.chats || {});
				const chat = chats.find(({ id }) => id === chatId);
				chat.users = users;

				return chats;
			})
		)();
	}

	sendFile(data: FormData, chatId: number) {
		return this.resourcesAPI.save(data).then((file: { id: number }) => {
			this.sockets[chatId].send(
				JSON.stringify({
					content: file.id,
					type: 'file'
				})
			);
		});
	}
}

export default new ChatController();
