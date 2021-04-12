import { IBlockProps } from '../../utils/Block';

export interface IInputProps extends IBlockProps {
	label?: string;
	name: string;
	type: string;
	value?: string|undefined;
	error?: string|undefined;
}
