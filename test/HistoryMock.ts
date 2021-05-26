interface IHistoryState {
	data: Record<string, any>;
	title: string;
	url: string;
}

export default class HistoryMock {
	public length: number;
	public state: IHistoryState;
	private queue: IHistoryState[];
	private stateIndex: number;

	constructor() {
		this.length = 1;
		this.state = {
			data: {},
			title: '',
			url: '/'
		};
		this.queue = [this.state];
		this.stateIndex = 0;
	}

	pushState(data: any, title: string, url?: string | null): void {
		this.length += 1;
		this.state = { data, title, url };
		this.stateIndex += 1;

		this.queue.push(this.state);
	}

	forward(): void {
		this.stateIndex += 1;

		if (this.stateIndex >= this.queue.length) {
			throw new Error();
		}

		this.state = this.queue[this.stateIndex];
	}

	back(): void {
		this.stateIndex -= 1;

		if (this.stateIndex < 0) {
			throw new Error();
		}

		this.state = this.queue[this.stateIndex];
	}
}
