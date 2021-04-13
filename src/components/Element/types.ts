import { IBlockProps } from '../../utils/Block';

export interface IElementProps extends IBlockProps {
	tagName: string;
	children?: any | any[];
	[key: string]: any;
}
