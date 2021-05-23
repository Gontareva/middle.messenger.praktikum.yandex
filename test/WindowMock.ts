import HistoryMock from './HistoryMock';

export default class WindowMock {
	public history: HistoryMock;
	public location: { pathname: any };

	constructor() {
		this.history = new HistoryMock();
		this.location = {
			pathname: this.history.state.url
		};
	}
}
