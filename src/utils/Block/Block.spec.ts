import { expect } from 'chai';

import Block from './Block';
import TestBlock from '../../../test/TestBlock';
import DocumentMock from '../../../test/DocumentMock';

describe('Block', () => {
	const blockProps = { title: 1 };

	let block;

	before(() => {
		global.document = new DocumentMock();
	});

	beforeEach(function () {
		block = new TestBlock(blockProps);
	});

	it('should change props', (done) => {
		expect(TestBlock.renderCount).to.be.equal(1);
		expect(TestBlock.changedCount).to.be.equal(0);

		block.setProps({ title: 2 });

		expect(block.props.title).to.be.equal(2);
		expect(block.props.title).to.not.be.equal(blockProps.title);

		setTimeout(() => {
			expect(TestBlock.renderCount).to.be.equal(2);
			expect(TestBlock.changedCount).to.be.equal(1);
			done();
		}, 1000);
	});

	it('should change state', (done) => {
		expect(TestBlock.renderCount).to.be.equal(1);
		expect(TestBlock.changedCount).to.be.equal(0);

		expect(block.state.description).to.be.undefined;

		block.setState({ description: 2 });

		expect(block.state.description).to.be.equal(2);

		setTimeout(() => {
			expect(TestBlock.renderCount).to.be.equal(2);
			expect(TestBlock.changedCount).to.be.equal(1);
			done();
		}, 1000);
	});

	it('component should not update', (done) => {
		expect(TestBlock.renderCount).to.be.equal(1);
		expect(TestBlock.changedCount).to.be.equal(0);
		expect(block.props).to.include(blockProps);

		block.setProps(blockProps);

		expect(block.props).to.include(blockProps);

		setTimeout(() => {
			expect(TestBlock.renderCount).to.be.equal(1);
			expect(TestBlock.changedCount).to.be.equal(0);
			done();
		}, 1000);
	});
});
