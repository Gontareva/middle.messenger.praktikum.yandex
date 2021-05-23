import isEqual from './isEqual';

type iterateeType =
	| string
	| ((obj1: Record<string, any>, obj2: Record<string, any>) => boolean);

export const union = (
	arr1: any[],
	arr2: any[],
	iteratee: iterateeType = isEqual
) => {
	const iterateeFunc =
		typeof iteratee === 'string'
			? (obj1, obj2) => obj1[iteratee] === obj2[iteratee]
			: iteratee;

	return arr2.reduce(
		(memo, item2) => {
			const item1 = arr1.find((item) => iterateeFunc(item, item2));

			if (!item1) {
				memo.push(item2);
			}

			return memo;
		},
		[...arr1]
	);
};
