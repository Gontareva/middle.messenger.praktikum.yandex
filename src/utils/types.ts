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
	chat_id: number;
	user_id: number;
	fileUrl?: string;
	user?: IUser;
	created_by: number;
}

export interface IChat {
	id: number;
	last_message: IMessage;
	unread_count: number;
	avatar: string;
	title: string;
	user: IUser;
	messages: IMessage[];
}
