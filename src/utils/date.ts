const longMonthsNames = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря'
];

const dayOfWeekNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const shortMonthsNames = [
	'янв',
	'фев',
	'мар',
	'апр',
	'май',
	'июн',
	'июл',
	'авг',
	'сен',
	'окт',
	'ноя',
	'дек'
];

export function getFormatDate(inputDate: VarDate): string {
	const date = new Date(inputDate);
	const now = new Date();

	let formattedDate = `${date.getDate()} ${longMonthsNames[date.getMonth()]}`;

	if (now.getFullYear() !== date.getFullYear()) {
		formattedDate = `${formattedDate} ${date.getFullYear()}`;
	}

	return formattedDate;
}

export function getFormatAccurateDate(inputDate: VarDate): string {
	const date = new Date(inputDate);
	let formattedDate: string;
	const now = new Date();

	const diff: number = now.getTime() - date.getTime();

	if (diff < 86400000) {
		formattedDate = formatTime(date);
	} else if (diff < 86400000 * 7) {
		formattedDate = dayOfWeekNames[date.getDay() + 1];
	} else {
		formattedDate = `${date.getDate()} ${shortMonthsNames[date.getMonth()]}`;

		if (now.getFullYear() !== date.getFullYear()) {
			formattedDate = `${formattedDate} ${date.getFullYear()}`;
		}
	}

	return formattedDate;
}

export function formatTime(date: Date): string {
	const hours: string = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');

	return `${hours}:${minutes}`;
}
