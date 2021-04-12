export interface IBlockProps {
	events?: { [key: string]: (...args) => void };
	[key: string]: any;
}
