export default class DocumentMock {
	public title: string;

	constructor() {
		this.title = '';
	}

	root = {
		append: () => this.root,
		remove: () => null
	};

	querySelector() {
		return this.root;
	}

	createElement = () => this.root;
}
