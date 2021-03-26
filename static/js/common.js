function getData(form) {
	const data = new FormData(form);

	return Object.fromEntries(data);
}

export function onSubmitForm(event) {
	event.preventDefault();

	//eslint-disable-next-line
	console.log(getData(e.target));
}

export function goBack() {
	window.history.back();
}
