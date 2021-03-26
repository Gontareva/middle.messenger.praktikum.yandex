export const groupBy = (list, field) => {
	list.reduce((memo, obj) => {
		if (memo[field]) {
			memo[field].push(obj);
		} else {
			memo[field] = [obj];
		}

		return memo;
	}, []);
};
