import Block from './Block';

export function getData(
	form: HTMLFormElement | EventTarget | any
): Record<string, unknown> {
	const data: FormData = new FormData(form);

	return Object.fromEntries(data);
}

export function onSubmitForm(event: any): Record<string, unknown> {
	event.preventDefault();

	const data = getData(event.target);

	// eslint-disable-next-line no-console
	console.log(data);

	return data;
}

export function renderPage(page: Block): HTMLElement {
	const element = document.getElementById('app');

	// eslint-disable-next-line no-console
	console.log(page.getContent());

	element.appendChild(page.getContent());

	return element;
}
