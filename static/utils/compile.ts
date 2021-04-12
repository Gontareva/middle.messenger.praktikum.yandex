import Block from './Block/Block';

export default function (
	template: (props: Record<string, unknown>) => string,
	props
): Element {
	const blocks: Block[] = [];

	const preparedProps = processOne(props, blocks);

	const element = document.createElement('div');
	element.innerHTML = template(preparedProps);

	blocks.forEach((block) => {
		block.insertInElement(element);
	});

	return element.firstElementChild;
}

function getElement(block, blocks: Block[]) {
	if (block instanceof Block) {
		return block.getPlaceholderHtml();
	}

	if (!block || isPrimitive(block) || typeof block === 'function') {
		return block;
	}

	return processOne(block, blocks);
}

function rememberBlock(block, blocks) {
	const el = getElement(block, blocks);

	if (block instanceof Block) {
		blocks.push(block);
	}

	return el;
}

function processOne(item: any, blocks: Block[]) {
	if (Array.isArray(item)) {
		return item.map((block) => rememberBlock(block, blocks));
	} else if (item && typeof item === 'object' && !(item instanceof Block)) {
		return Object.keys(item).reduce((memo, key) => {
			memo[key] = processOne(item[key], blocks);

			return memo;
		}, {});
	}

	return rememberBlock(item, blocks);
}

function isPrimitive(value: any): boolean {
	return Object(value) !== value;
}
