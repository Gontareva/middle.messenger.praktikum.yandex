// base-api.js
export class BaseAPI {
	// На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
	create(): Promise<unknown> | never {
		throw new Error('Not implemented');
	}

	request(): Promise<unknown> | never {
		throw new Error('Not implemented');
	}

	update(): Promise<unknown> | never {
		throw new Error('Not implemented');
	}

	delete(): Promise<unknown> | never {
		throw new Error('Not implemented');
	}
}
