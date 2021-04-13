import { IBlockProps } from '../../utils/Block/types';

export interface IAvatarProps extends IBlockProps {
	imageSrc: string;
	canChange?: boolean;
}
