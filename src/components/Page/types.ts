import { IBlockProps } from '../../utils/Block/types';

export interface IPageProps extends IBlockProps {
	title: string;
	template: (props: Record<string, unknown>) => string;
	render: () => Record<string, unknown>;
}
