export interface IUser {
	id: number;
	avatar?: string;
	display_name?: string;
	email?: string;
	first_name?: string;
	second_name?: string;
	login?: string;
	phone?: string;
}

export enum StatusEnum {
	read = 'read',
	new = 'new',
	send = 'send',
	sending = 'sending'
}

export interface IMessage {
	content?: string;
	time: Date;
	status?: StatusEnum;
	is_read: boolean;
	chat_id: number;
	user_id: number;
	file?: string;
	user?: IUser;
}

export interface IChat {
	id: number;
	last_message: IMessage;
	unread_count: number;
	avatar: string;
	title: string;
	user: IUser;
	users?: IUser[];
	messages: IMessage[];
	created_by: number;
}
