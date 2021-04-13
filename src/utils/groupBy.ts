type IterateeType<T> = (item: T) => number | string;

export default function groupBy<T>(
	list: T[],
	iteratee: IterateeType<T>
): Record<string, T[]> {
	const iterateeFunc =
		typeof iteratee === 'function' ? iteratee : (item) => item[iteratee];

	return list.reduce((memo: Record<string, T[]>, item: T) => {
		const field = iterateeFunc(item);

		if (memo[field]) {
			memo[field].push(item);
		} else {
			memo[field] = [item];
		}

		return memo;
	}, {});
}
