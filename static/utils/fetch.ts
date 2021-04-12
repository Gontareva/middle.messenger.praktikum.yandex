const enum METHODS {
	GET = 'GET',
	PUT = 'PUT',
	POST = 'POST',
	DELETE = 'DELETE'
}

interface IOption {
	headers?: object;
	data?: object;
	timeout?: number;
	method?: METHODS;
}

function queryStringify(data) {
	//const string = new URLSearchParams(data).toString();
	const string = Object.entries(data)
		.reduce((memo, [key, val]) => `${memo}${key}=${val}&`, '')
		.slice(0, -1);

	return string ? `?${string}` : '';
}

class HTTPTransport {
	get = (url: string, options: IOption = {}): Promise<XMLHttpRequest> => {
		const { data, timeout, ...rest } = options;
		const query = queryStringify(data);

		return this.request(
			`${url}${query}`,
			{ ...rest, method: METHODS.GET },
			timeout
		);
	};

	post = (url: string, options: IOption = {}) => {
		const { timeout, ...rest } = options;

		return this.request(url, { ...rest, method: METHODS.POST }, timeout);
	};

	put = (url: string, options: IOption = {}) => {
		const { timeout, ...rest } = options;

		return this.request(url, { ...rest, method: METHODS.PUT }, timeout);
	};

	delete = (url: string, options: IOption = {}) => {
		const { timeout, ...rest } = options;

		return this.request(url, { ...rest, method: METHODS.DELETE }, timeout);
	};

	request = (
		url: string,
		options: IOption,
		timeout: number = 5000
	): Promise<XMLHttpRequest> =>
		new Promise((resolve, reject) => {
			const { data, headers = {}, method = METHODS.GET } = options;

			const xhr = new XMLHttpRequest();

			if (method === METHODS.GET && data) {
				xhr.open(method, `${url}${queryStringify(data)}`, true);
			} else {
				xhr.open(method, url, true);
			}

			Object.entries(headers).forEach((header: [string, string]) =>
				xhr.setRequestHeader(...header)
			);

			xhr.timeout = timeout;
			xhr.ontimeout = reject;
			xhr.onloadend = reject;
			xhr.onerror = reject;

			xhr.onload = () => resolve(xhr);

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else {
				xhr.send(JSON.stringify(data));
			}

			return xhr;
		});
}
