import { IBlockProps } from '../../utils/Block';

export interface IAvatarProps extends IBlockProps {
	imageSrc: string;
	canChange?: boolean;
	onChange?: (f: FormData) => any;
}
