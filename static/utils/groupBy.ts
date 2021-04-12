type IterateeType = (i: any) => any | string;

export default function groupBy(list: any[], iteratee: IterateeType) {
	const iterateeFunc =
		typeof iteratee === 'function' ? iteratee : (item) => item[iteratee];

	return list.reduce((memo, item) => {
		const field = iterateeFunc(item);

		if (memo[field]) {
			memo[field].push(item);
		} else {
			memo[field] = [item];
		}

		return memo;
	}, {});
}
