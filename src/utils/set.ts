type Indexed<T = unknown> = {
	[key in string]: T;
};

function isObject(val) {
	return typeof val === 'object' && !Array.isArray(val) && val;
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
	if (!isObject(lhs) || !isObject(lhs)) {
		return rhs || lhs;
	}
	return Object.keys(rhs).reduce((memo, key) => {
		if (memo[key]) {
			const mergeResult = merge(memo[key] as Indexed, rhs[key] as Indexed);

			if (mergeResult) {
				memo[key] = mergeResult;
			} else {
				memo[key] = { ...(memo[key] as Indexed), ...(rhs[key] as Indexed) };
			}
		} else {
			memo[key] = rhs[key];
		}

		return memo;
	}, lhs);
}

export default function set(
	object: Indexed | unknown,
	path: string,
	value: unknown
): Indexed | unknown {
	if (typeof path !== 'string') {
		throw new Error('path must be string');
	}

	if (!isObject(object)) {
		return object;
	}

	const newObject = path
		.split('.')
		.reverse()
		.reduce((memo, field) => ({ [field]: memo }), value);

	return merge(object as Indexed, newObject as Indexed);
}
