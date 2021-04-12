 export default function isEqual(obj1: any, obj2: any) {
	if(obj1 === obj2) {
		return true;
	}

	 if(Array.isArray(obj1) && Array.isArray(obj2)) {
		 if(obj1.length !== obj2.length) {
			 return false;
		 }

		 const array: Array<any> = obj1;

		 return compareByKeys(obj1, obj2, [...array.keys()]);
	 } else if(typeof obj1 === 'object' && typeof obj2 === 'object') {
		const keys = Object.keys(obj1).sort();
		if(isEqual(keys, Object.keys(obj2).sort())) {
			return compareByKeys(obj1, obj2, keys);
		}
	}

	return false;
}

function compareByKeys(obj1, obj2, keys) {
	return keys.every((key) => {
		if(obj1[key] !== obj2[key]) {
			return isEqual(obj1[key], obj2[key]);
		}

		return true;
	});
}
