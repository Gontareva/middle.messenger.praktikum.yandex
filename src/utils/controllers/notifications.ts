import { dispatch } from '../Store';

export class NotificationsController {
	add(message: string): void {
		dispatch('notification', () => message)();
	}

	remove(): void {
		dispatch('notification', () => '')();
	}
}

export default new NotificationsController();
