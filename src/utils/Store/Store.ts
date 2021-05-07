import EventBus from '../eventBus';
import set from '../set';
import deepCopy from '../deepCopy';

class Store {
	private readonly _eventBus: () => EventBus;
	public state: Record<string, any>;

	constructor(defaultState = {}) {
		const _eventBus = new EventBus();
		this._eventBus = () => _eventBus;

		this.state = new Proxy(defaultState, {
			get: (target: Record<string, any>, field: string) => target[field],
			set: (
				target: Record<string, any>,
				field: string,
				value: unknown
			): boolean => {
				target[field] = value;

				setTimeout(() => this._eventBus().emit(field), 0);

				return true;
			}
		});
	}

	attachListener = (path, callback) => {
		this._eventBus().on(path, callback);
	};

	detachListener = (path, callback) => {
		this._eventBus().off(path, callback);
	};
}

export const dispatch = (path: string, func: (...args) => any) => (
	...args: any[]
) => {
	const result = func(args);

	if (result && result.then) {
		result.then((data) => {
			set(storeInstance.state, path, data);
		});
	} else {
		set(storeInstance.state, path, result);
	}

	return result;
};

export const makeSelector = (...selectors: ((any) => any)[]) =>
	deepCopy(selectors.reduce((memo, func) => func(memo), storeInstance.state));

let storeInstance = null;

export const createStore = (defaultState) => {
	storeInstance = new Store(defaultState);
};

export const attachListener = (path, callback) => {
	if (storeInstance) {
		storeInstance.attachListener(path, callback);
	}
};

export const detachListener = (path, callback) => {
	if (storeInstance) {
		storeInstance.detachListener(path, callback);
	}
};

export const getState = () => {
	if (storeInstance) {
		return storeInstance.state;
	}

	throw new Error('Store was not created');
};

export default Store;
