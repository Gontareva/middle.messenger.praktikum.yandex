export const escape = (str) =>
	str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');

export const escapeObject = (obj) =>
	obj &&
	Object.keys(obj).reduce((memo, key) => {
		if (typeof obj[key] === 'object' && !(obj[key] instanceof Date)) {
			memo[key] = escapeObject(obj[key]);
		} else if (typeof obj[key] === 'string') {
			memo[key] = escape(obj[key]);
		}

		return memo;
	}, obj);

export const unescape = (str: string): string =>
	str
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/&amp;/g, '&');

export const unescapeObject = (obj: Record<string, any>): Record<string, any> =>
	obj &&
	Object.keys(obj).reduce((memo, key) => {
		if (typeof obj[key] === 'object' && !(obj[key] instanceof Date)) {
			memo[key] = unescapeObject(obj[key]);
		} else if (typeof obj[key] === 'string') {
			memo[key] = unescape(obj[key]);
		}

		return memo;
	}, obj);
