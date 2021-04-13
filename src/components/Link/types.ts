import { IBlockProps } from '../../utils/Block';

export interface ILinkProps extends IBlockProps {
	text?: string;
	themes?: string[];
	className?: string;
	[key: string]: any;
}
