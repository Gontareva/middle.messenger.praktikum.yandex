import { IBlockProps } from '../../utils/Block';
import { IChat, IUser } from '../../utils/types';

export interface IChatListItemProps extends IBlockProps {
	chat: IChat;
	user: IUser;
	deleteChat: (id: number) => void;
	onItemClick: () => void;
}
