import Block from './Block';

export function getData(
	form: HTMLFormElement | EventTarget | any
): Record<string, unknown> {
	const data: FormData = new FormData(form);

	return Object.fromEntries(data);
}

export function onSubmitForm(event: any): Record<string, unknown> {
	return getData(event.target);
}

export function renderPage(query: string, block: Block): Element {
	const root = document.querySelector(query);
	root.append(block.getContent());

	return root;
}
