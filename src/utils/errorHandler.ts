import { escape } from './escape';
import { dispatch } from './Store';

export const errorHandler = ({
	response = '{}',
	message
}: {
	response?: string;
	message?: string;
}): void => {
	const { reason = message || 'Неизвестная ошибка' } = JSON.parse(response);

	dispatch('notification', () => escape(reason))();
};
