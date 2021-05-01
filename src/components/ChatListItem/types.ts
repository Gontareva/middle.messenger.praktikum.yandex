import { IBlockProps } from '../../utils/Block/types';
import { IChat, IUser } from '../../utils/types';

export interface IChatListItemProps extends IBlockProps {
	chat: IChat;
	user: IUser;
}
