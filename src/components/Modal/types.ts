import Block, { IBlockProps } from '../../utils/Block';

export interface IModalProps extends IBlockProps {
	isOpen?: boolean;
	theme?: string;
	render: (errors: { [key: string]: string }) => IModalTemplateProps;
	onCloseButtonClick: () => void;
}

export interface IModalTemplateProps extends IBlockProps {
	className?: string;
	children: Block | string | Block[];
	header?: Block | string;
}
