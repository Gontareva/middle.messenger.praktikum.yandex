export interface IBlockProps {
	events?: { [key: string]: (...args: any[]) => void };
	[key: string]: ((...args: any[]) => unknown) | any;
}
