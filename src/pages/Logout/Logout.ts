import Block from '../../utils/Block';
import authController from '../../utils/controllers/auth';

export default class LogoutPage extends Block {
	constructor() {
		super();

		document.title = 'Выход';
	}

	componentDidMount() {
		authController.logout();
	}
}
