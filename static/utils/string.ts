export function prune(str: string = '', length: number): string {
	let text = str;

	if (str.length > length) {
		text = `${text.slice(0, length)}...`;
	}

	return text;
}
