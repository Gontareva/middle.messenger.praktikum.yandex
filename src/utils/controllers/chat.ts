import ChatAPI from '../api/chat';
import { dispatch, makeSelector } from '../Store';
import { baseApiUrl, wsProtocol } from '../../../config';
import UserAPI from '../api/user';

class ChatController {
	private chatApi: ChatAPI;
	public sockets: Record<string, WebSocket>;
	private userApi: UserAPI;

	constructor() {
		this.chatApi = new ChatAPI();
		this.userApi = new UserAPI();

		this.sockets = {};
	}

	create(data) {
		return this.chatApi.create(data).then(() => this.request());
	}

	request() {
		return dispatch('chats', this.chatApi.request)();
	}

	delete(id: number) {
		return this.chatApi.delete(id).then(() => this.request());
	}

	initChat(userId: number, chatId: number): void {
		this.getChat(userId, chatId).then(() => {
			this.getOldMessage(userId, chatId, 0);
		});
	}

	getChat(userId: number, chatId: number): Promise<WebSocket> {
		return new Promise((resolve, reject) => {
			this.chatApi
				.token(chatId)
				.then((token) => {
					this.createChatSocket(userId, chatId, token).then(resolve);
				})
				.catch(reject);
		});
	}

	getOldMessage(userId: number, chatId: number, skip: number): void {
		this.getSocket(userId, chatId).then((socket) =>
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
				this.getChat(userId, chatId).then(resolve).catch(reject);
			}

			resolve(socket);
		});
	}

	sendMessage(userId: number, chatId: number, content: string) {
		this.getSocket(userId, chatId).then((socket: WebSocket) =>
			socket.send(
				JSON.stringify({
					content,
					type: 'message'
				})
			)
		);
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

				let data = JSON.parse(event.data);
				data = Array.isArray(data) ? data : [data];
				data = data.map(({ time, ...message }) => ({
					...message,
					time: new Date(time)
				}));
				const messages = makeSelector(
					(state) => state.messages || {},
					(obj) => obj[chatId] || []
				);

				dispatch(`messages`, () => ({ [chatId]: messages.concat(data) }))();
			});

			socket.addEventListener('error', (event: ErrorEvent) => {
				console.log('Ошибка', event.message);

				reject(event.message);
			});
		});
	}
	/* eslint-enable no-console */

	addUser(login: string, chatId: number) {
		this.userApi
			.search(login)
			.then(({ id }) => this.chatApi.addUser(id, chatId));
	}
}

export default new ChatController();
