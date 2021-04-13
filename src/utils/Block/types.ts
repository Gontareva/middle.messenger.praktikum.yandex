export interface IBlockProps {
	events?: { [key: string]: (...args) => void };
	[key: string]: ((...args) => unknown) | any;
}
