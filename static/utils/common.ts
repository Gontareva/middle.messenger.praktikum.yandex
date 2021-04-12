import Block from './Block';

export function getData(form: HTMLFormElement|EventTarget|any): object {
	const data: FormData = new FormData(form);

	return Object.fromEntries(data);
}

export function onSubmitForm(event: any): object {
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
