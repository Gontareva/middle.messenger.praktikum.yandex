type Arg = (string | Record<string, unknown> | Arg)[];

export default function classnames(...args: Arg): string {
	return args
		.reduce<string[]>((memo: string[], obj: Arg): string[] => {
			if (obj) {
				if (Array.isArray(obj)) {
					memo.push(classnames(...obj));
				} else if (typeof obj === 'object') {
					memo.push(classnames(Object.keys(obj).filter((key) => obj[key])));
				} else {
					memo.push(obj);
				}
			}

			return memo;
		}, [])
		.filter(Boolean)
		.join(' ');
}
