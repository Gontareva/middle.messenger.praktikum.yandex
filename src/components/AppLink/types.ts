import { IBlockProps } from '../../utils/Block';

export interface IAppLinkProps extends IBlockProps {
	text?: string;
	href: string;
	themes?: string[];
	className?: string;
	[key: string]: unknown;
}
