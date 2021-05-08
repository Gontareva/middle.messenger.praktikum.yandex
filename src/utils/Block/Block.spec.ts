import { expect } from 'chai';

import Block from './Block';

describe('Block', () => {
	const blockProps = { title: 1 };

	class TestBlock extends Block {
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

	let block;

	beforeEach(function () {
		block = new TestBlock(blockProps);
	});

	it('should change props', () => {
		expect(TestBlock.renderCount).to.be.equal(1);
		expect(TestBlock.changedCount).to.be.equal(0);

		block.setProps({ title: 2 });

		expect(block.props.title).to.be.equal(2);
		expect(block.props.title).to.not.be.equal(blockProps.title);

		setTimeout(() => {
			expect(TestBlock.renderCount).to.be.equal(2);
			expect(TestBlock.changedCount).to.be.equal(1);
		}, 300);
	});

	it('should change state', () => {
		expect(TestBlock.renderCount).to.be.equal(1);
		expect(TestBlock.changedCount).to.be.equal(0);

		expect(block.state.description).to.be.undefined;

		block.setState({ description: 2 });

		expect(block.state.description).to.be.equal(2);

		setTimeout(() => {
			expect(TestBlock.renderCount).to.be.equal(2);
			expect(TestBlock.changedCount).to.be.equal(1);
		}, 300);
	});

	it('component should not update', () => {
		expect(TestBlock.renderCount).to.be.equal(1);
		expect(TestBlock.changedCount).to.be.equal(0);
		expect(block.props).to.include(blockProps);

		block.setProps(blockProps);

		expect(block.props).to.include(blockProps);

		setTimeout(() => {
			expect(TestBlock.renderCount).to.be.equal(1);
			expect(TestBlock.changedCount).to.be.equal(0);
		}, 300);
	});
});
