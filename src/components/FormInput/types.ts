import { IBlockProps } from '../../utils/Block';

export interface IFormInputProps extends IBlockProps {
	title: string;
	type?: string;
	value?: string | undefined;
	readOnly?: boolean;
	name: string;
	placeholder?: string;
	error?: string | undefined;
}
