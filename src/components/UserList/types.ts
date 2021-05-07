import { IBlockProps } from '../../utils/Block';
import { IUser } from '../../utils/types';

export interface IUserListProps extends IBlockProps {
	users: IUser[];
}
