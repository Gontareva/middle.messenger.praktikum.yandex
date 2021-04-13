class EventBus {
	private readonly listeners: Record<string, ((...args) => void)[]>;

	constructor() {
		this.listeners = {};
	}

	on(event: string, callback: () => void): void {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	}

	off(event: string, callback: () => void): never | void {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event] = this.listeners[event].filter(
			(listener) => listener !== callback
		);
	}

	emit(event: string, ...args: unknown[]): Promise<unknown> {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		return Promise.all(
			this.listeners[event].map(function (listener) {
				return new Promise((resolve) => resolve(listener(...args)));
			})
		);
	}
}

export default EventBus;
