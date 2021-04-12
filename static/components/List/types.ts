import Block, { IBlockProps } from '../../utils/Block';

export interface IListProps extends IBlockProps {
	theme?: string;
	items: (Block | Record<string, unknown>)[];
}
