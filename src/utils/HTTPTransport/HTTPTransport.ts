import { escape } from '../../escape';

enum METHODS {
	GET = 'GET',
	PUT = 'PUT',
	POST = 'POST',
	DELETE = 'DELETE'
}

interface IOption {
	headers?: Record<string, unknown>;
	data?: Record<string, any> | FormData;
	timeout?: number;
	method?: METHODS;
	withCredentials?: boolean;
	isFormData?: boolean;
}

function queryStringify(data = {}) {
	//const string = new URLSearchParams(data).toString();
	const string = Object.entries(data)
		.reduce((memo, [key, val]) => `${memo}${key}=${val}&`, '')
		.slice(0, -1);

	return string ? `?${string}` : '';
}

export default class HTTPTransport {
	private apiUrl: string;

	constructor(apiUrl: string) {
		this.apiUrl = apiUrl;
	}

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

	request(
		url: string,
		options: IOption,
		timeout = 5000
	): Promise<XMLHttpRequest> {
		return new Promise((resolve, reject) => {
			const {
				data,
				headers = {
					'Content-Type': 'application/json'
				},
				method = METHODS.GET,
				withCredentials = true,
				isFormData = false
			} = options;

			const xhr = new XMLHttpRequest();
			const fullUrl =
				method === METHODS.GET && data
					? `${this.apiUrl}${url}${queryStringify(data)}`
					: `${this.apiUrl}${url}`;

			xhr.open(method, fullUrl, true);

			Object.entries(headers).forEach((header: [string, string]) =>
				xhr.setRequestHeader(...header)
			);

			xhr.withCredentials = withCredentials;
			xhr.timeout = timeout;
			xhr.ontimeout = reject;
			xhr.onloadend = reject;
			xhr.onerror = reject;

			xhr.onload = () => {
				if (xhr.status >= 400) {
					// eslint-disable-next-line no-console
					console.log('fetch--->error', method, fullUrl, data);

					return reject(xhr);
				}

				// eslint-disable-next-line no-console
				console.log('fetch--->end', method, fullUrl, data);

				return resolve(xhr);
			};

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else {
				xhr.send(isFormData ? (data as FormData) : JSON.stringify(data));
			}

			// eslint-disable-next-line no-console
			console.log('fetch', method, fullUrl, data);

			return xhr;
		});
	}
}
