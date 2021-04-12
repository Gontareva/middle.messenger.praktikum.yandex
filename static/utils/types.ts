export interface IUser {
	_id: number;
	avatar?: string;
	display_name: string;
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
	text?: string;
	publishDate: Date;
	status?: StatusEnum;
	fromUserId: number;
	toUserId: number;
	fileUrl?: string;
}

export interface IChat {
	user: IUser;
	messages: IMessage[];
}
