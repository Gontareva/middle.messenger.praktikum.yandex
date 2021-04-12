export function modifiers(prefix: string, items?: string[], delimiter = '_') {
	return (items || []).map((modifier) => `${prefix}${delimiter}${modifier}`);
}
