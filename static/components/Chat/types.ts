import { IBlockProps } from '../../utils/Block/types';
import { IChat, IUser } from '../../utils/types';

export interface IChatProps extends IBlockProps {
	chat: IChat;
	user: IUser;
}
