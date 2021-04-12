import deepCopy from './deepCopy';

type ValidateFuncType = (str?: any) => string | undefined | null;
type SchemaType = { [key: string]: (string | ValidateFuncType)[] };

export default class Validator {
	private readonly emailRegExp: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	private readonly phoneRegExp: RegExp = /^((\+7|7|8)+([0-9]){10})$/;
	private readonly listeners = {};
	private _errors: object = {};
	private form: HTMLFormElement;
	readonly schema: SchemaType;

	constructor(schema: SchemaType, callback) {
		this.schema = schema;

		this._errors = new Proxy(
			{},
			{
				set(target, prop, value) {
					const valueChanged = target[prop] !== value;

					target[prop] = value;

					if (!value) {
						delete target[prop];
					}

					if (valueChanged) {
						callback(deepCopy(target));
					}

					return true;
				}
			}
		);
	}

	addListeners(form) {
		this.form = form;

		Object.keys(this.schema).forEach((name) => {
			const el = this.form.querySelector(`[name="${name}"]`);

			if (el) {
				const handle = () => {
					const data = new FormData(this.form);
					const value = data.get(name);

					this._errors[name] = this.schema[name]
						.map((validate) =>
							typeof validate === 'function'
								? validate(value)
								: this[validate](value)
						)
						.filter(Boolean)[0];
				};

				if (!this.listeners[name]) {
					this.listeners[name] = { el, handle };
				}

				el.addEventListener('focus', handle);
				el.addEventListener('blur', handle);
			}
		});
	}

	detachListeners() {
		Object.keys(this.listeners).forEach((elementName) => {
			const { el, handle } = this.listeners[elementName];

			el.removeEventListener('focus', handle);
			el.removeEventListener('blur', handle);

			delete this.listeners[elementName];
		});
	}

	validate() {
		Object.keys(this.listeners).forEach((elementName) =>
			this.listeners[elementName].handle()
		);

		return !Object.keys(this._errors).length;
	}

	email(string: string = '') {
		return !string || this.emailRegExp.test(string) ? null : 'Невалидный email';
	}

	password(string: string = '') {
		return !string || string.length > 4
			? null
			: 'Пароль должен быть больше 4 символов';
	}

	phone(string: string = '') {
		return !string || this.phoneRegExp.test(string)
			? null
			: 'Неверный формат номера! Пример: +79803777869 или 89803777869';
	}

	required(string: string = '') {
		return string ? null : 'Обязательное поле!';
	}

	get errors() {
		return this._errors;
	}
}
