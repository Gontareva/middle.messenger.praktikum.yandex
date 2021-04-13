import { IBlockProps } from '../../utils/Block/types';

export interface IButtonProps extends IBlockProps {
	text?: string;
	themes?: string[];
	className?: string;
	[key: string]: unknown;
}
