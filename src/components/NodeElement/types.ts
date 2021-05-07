import Block, { IBlockProps } from '../../utils/Block';

type ChildrenType = Block | string | number | null | undefined;

export interface INodeElementProps extends IBlockProps {
	tagName: string;
	children?: ChildrenType | ChildrenType[];
	[key: string]: unknown;
}
