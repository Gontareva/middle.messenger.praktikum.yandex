type RootType = {
	append: () => RootType;
	remove: () => null;
};

export default class DocumentMock {
	public title: string;

	constructor() {
		this.title = '';
	}

	root = {
		append: (): RootType => this.root,
		remove: (): null => null
	};

	querySelector(): RootType {
		return this.root;
	}

	createElement = (): RootType => this.root;
}
