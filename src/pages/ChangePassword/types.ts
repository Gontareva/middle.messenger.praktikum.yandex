import { IBlockProps } from '../../utils/Block';
import { IUser } from '../../utils/types';

export interface IChangePasswordPageProps extends IBlockProps {
	user?: IUser;
}
