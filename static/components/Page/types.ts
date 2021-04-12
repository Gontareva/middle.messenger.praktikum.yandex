import { IBlockProps } from '../../utils/Block/types';

export interface IPageProps extends IBlockProps {
	title: string;
	template: (props: object) => string;
	render: () => object;
}
