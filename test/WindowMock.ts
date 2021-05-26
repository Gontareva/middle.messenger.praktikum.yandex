import HistoryMock from './HistoryMock';

export default class WindowMock {
	public history: HistoryMock;
	public location: { pathname: unknown };

	constructor() {
		this.history = new HistoryMock();
		this.location = {
			pathname: this.history.state.url
		};
	}
}
