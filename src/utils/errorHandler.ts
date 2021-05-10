import { escape } from '../escape';
import { dispatch } from './Store';

export const errorHandler = ({ response = '{}', message }) => {
	const { reason = message || 'Неизвестная ошибка' } = JSON.parse(response);

	dispatch('notification', () => escape(reason))();
};
