import { IChat, IUser, StatusEnum } from './types';

export const user: IUser = {
	_id: 15,
	email: 'email',
	first_name: 'first_name',
	second_name: 'second_name',
	display_name: 'display_name',
	login: 'login',
	phone: 'phone'
};

export const users: IUser[] = [
	{
		_id: 12,
		display_name: '12_qwert'
	},
	{
		_id: 15,
		display_name: '15_qwert'
	},
	{
		_id: 120,
		display_name: '120_qwert'
	},
	{
		_id: 150,
		display_name: '150_qwert'
	}
];

export const chats: IChat[] = [
	{
		user: users[0],
		messages: [
			{
				text: 'fghjkl',
				publishDate: new Date('1995-12-17T03:24:00'),
				status: StatusEnum.read,
				fromUserId: users[0]._id,
				toUserId: users[1]._id
			},
			{
				text: 'fghjkl',
				publishDate: new Date(),
				status: StatusEnum.new,
				fromUserId: users[1]._id,
				toUserId: users[0]._id
			}
		]
	},
	{
		user: users[2],
		messages: [
			{
				text:
					'1Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n\nХассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
				publishDate: new Date(),
				status: StatusEnum.read,
				fromUserId: users[1]._id,
				toUserId: users[2]._id
			},
			{
				text: 'fghjkl',
				publishDate: new Date(),
				status: StatusEnum.read,
				fromUserId: users[2]._id,
				toUserId: users[1]._id
			},
			{
				text: 'fghjkl',
				publishDate: new Date(),
				status: StatusEnum.read,
				fromUserId: users[2]._id,
				toUserId: users[1]._id
			},
			{
				text:
					'2Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n\nХассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
				publishDate: new Date(),
				status: StatusEnum.read,
				fromUserId: users[1]._id,
				toUserId: users[2]._id
			},
			{
				fileUrl:
					'https://www.culture.ru:443/storage/images/cff422b4292f0fc9b6fe216ffd046307/6caf84bc93fd1de750556ebda541ff34.jpg/_/1.webp',
				publishDate: new Date(),
				status: StatusEnum.sending,
				fromUserId: users[1]._id,
				toUserId: users[2]._id
			},
			{
				fileUrl:
					'https://www.culture.ru:443/storage/images/cff422b4292f0fc9b6fe216ffd046307/6caf84bc93fd1de750556ebda541ff34.jpg/_/1.webp',
				text:
					'3Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n\nХассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
				publishDate: new Date(),
				status: StatusEnum.send,
				fromUserId: users[1]._id,
				toUserId: users[2]._id
			}
		]
	},
	{
		user: users[3],
		messages: [
			{
				text: 'fgfghjkl,kjhggfghjkljhhgfhjkjkl',
				publishDate: new Date('2021-03-22T03:24:00'),
				status: StatusEnum.new,
				fromUserId: users[3]._id,
				toUserId: users[1]._id
			},
			{
				text: 'fgfghjkl,kjhggfghjkljhhgfhjkjkl',
				publishDate: new Date('2021-03-22T04:24:00'),
				status: StatusEnum.new,
				fromUserId: users[3]._id,
				toUserId: users[1]._id
			},
			{
				text: 'gbrvfcdfg',
				publishDate: new Date(),
				status: StatusEnum.new,
				fromUserId: users[1]._id,
				toUserId: users[3]._id
			},
			{
				fileUrl:
					'https://www.culture.ru:443/storage/images/cff422b4292f0fc9b6fe216ffd046307/6caf84bc93fd1de750556ebda541ff34.jpg/_/1.webp',
				text: 'gbrvfcdfg',
				publishDate: new Date(),
				status: StatusEnum.new,
				fromUserId: users[1]._id,
				toUserId: users[3]._id
			},
			{
				fileUrl:
					'https://www.culture.ru:443/storage/images/cff422b4292f0fc9b6fe216ffd046307/6caf84bc93fd1de750556ebda541ff34.jpg/_/1.webp',
				publishDate: new Date(),
				status: StatusEnum.new,
				fromUserId: users[1]._id,
				toUserId: users[3]._id
			}
		]
	}
];
