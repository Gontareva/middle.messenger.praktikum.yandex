export const errorHandler = ({ response = '{}', message }) => {
	const { reason = message || 'Неизвестная ошибка' } = JSON.parse(response);
	alert(reason);
};
