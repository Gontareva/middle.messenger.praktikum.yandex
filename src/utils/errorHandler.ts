export const errorHandler = ({ response }) => {
	const { reason = 'Неизвестная ошибка' } = JSON.parse(response);
	alert(reason);
};
