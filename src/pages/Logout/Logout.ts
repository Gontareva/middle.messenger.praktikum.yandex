import Block from '../../utils/Block';
import authController from '../../utils/controllers/auth';

export default class LogoutPage extends Block {
	componentDidMount() {
		authController.logout();
	}
}
