export default function deepCopy(
	obj: Record<string, any>
): Record<string, any> {
	if (Array.isArray(obj)) {
		return obj.map(deepCopy);
	} else if (obj instanceof Date) {
		return new Date(obj);
	} else if (obj && typeof obj === 'object') {
		return Object.keys(obj).reduce((memo, key) => {
			memo[key] = deepCopy(obj[key]);

			return memo;
		}, {});
	}

	return obj;
}
