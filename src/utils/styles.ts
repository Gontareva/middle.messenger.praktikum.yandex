export function modifiers(
	prefix: string,
	items?: string[],
	delimiter = '_'
): string[] {
	return (items || []).map((modifier) => `${prefix}${delimiter}${modifier}`);
}
