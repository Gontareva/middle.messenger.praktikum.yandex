import Block, { IBlockProps } from '../../utils/Block';

export interface IFormProps extends IBlockProps {
	schema?: Record<string, unknown>;
	theme?: string;
	render: (errors: { [key: string]: string }) => IFormTemplateProps;
}

export interface IFormTemplateProps extends IBlockProps {
	className?: string;
	body: Block | string | Block[];
	footer?: Block | string;
}
