import Block from './Block/Block';

export default function (
	template: (props: Record<string, unknown>) => string,
	props: Record<string, unknown>
): Element {
	const blocks: Block[] = [];

	const preparedProps = processOne(props, blocks) as Record<string, unknown>;

	const element = document.createElement('div');
	element.innerHTML = template(preparedProps);

	blocks.forEach((block) => {
		block.insertInElement(element);
	});

	return element.firstElementChild;
}

function getElement(block: unknown, blocks: Block[]): any {
	if (block instanceof Block) {
		return block.getPlaceholderHtml();
	}

	if (!block || isPrimitive(block) || typeof block === 'function') {
		return block;
	}

	return processOne(block, blocks);
}

function rememberBlock(block: unknown, blocks: Block[]) {
	const el = getElement(block, blocks);

	if (block instanceof Block) {
		blocks.push(block);
	}

	return el;
}

function processOne(item: Record<string, any>, blocks: Block[]): unknown {
	if (Array.isArray(item)) {
		return item.map((block) => rememberBlock(block, blocks));
	} else if (item && typeof item === 'object' && !(item instanceof Block)) {
		return Object.keys(item).reduce((memo: Record<string, unknown>, key) => {
			memo[key] = processOne(item[key], blocks);

			return memo;
		}, {});
	}

	return rememberBlock(item, blocks);
}

function isPrimitive(value: unknown): boolean {
	return Object(value) !== value;
}
