import { IBlockProps } from '../../utils/Block';
import { IMessage } from '../../utils/types';

export interface IMessageProps extends IBlockProps {
	message: IMessage;
	isOwnMessage?: boolean;
}
