import Block from '../../utils/Block';
import Modal from '../Modal';

import {
	attachListener,
	detachListener,
	makeSelector
} from '../../utils/Store';

import { INotificationProps } from './types';

export default class Notification extends Block {
	private timeoutHandle: NodeJS.Timeout;

	constructor(props?: INotificationProps) {
		super(props);

		this.getNotification = this.getNotification.bind(this);
		this.getNotification();
		attachListener('notification', this.getNotification);
	}

	init(): void {
		this.state = {
			isOpen: false
		};
	}

	getNotification(): void {
		const notification = makeSelector((state) => state.notification);

		if (notification) {
			this.setProps({
				notification
			});
			this.setState({ isOpen: true });

			this.timeoutHandle = setTimeout(() => {
				this.timeoutHandle = null;
				this.setState({
					isOpen: false
				});
			}, 3000);
		}
	}

	componentWillUnmount(): void {
		detachListener('notification', this.getNotification);
	}

	handleCloseButtonClick = (): void => {
		if (this.timeoutHandle) {
			clearTimeout(this.timeoutHandle);
		}
		this.setState({ isOpen: false });
	};

	render(): Element {
		return new Modal({
			isOpen: this.state.isOpen,
			onCloseButtonClick: this.handleCloseButtonClick,
			render: () => ({
				children: this.props.notification
			})
		}).getContent();
	}
}
