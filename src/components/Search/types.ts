import { IBlockProps } from '../../utils/Block/types';

export interface ISearchProps extends IBlockProps {
	id?: string;
	placeholder?: string;
	title?: string;
	onChange?: (title: string) => void;
}
