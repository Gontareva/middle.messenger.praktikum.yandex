import Block from '../src/utils/Block';

export default class TestBlock extends Block {
	public static renderCount: number;
	public static changedCount: number;

	constructor(props) {
		TestBlock.renderCount = 0;
		TestBlock.changedCount = 0;

		super(props);
	}

	componentDidUpdate() {
		TestBlock.changedCount += 1;
	}

	render() {
		TestBlock.renderCount += 1;

		return super.render();
	}
}
