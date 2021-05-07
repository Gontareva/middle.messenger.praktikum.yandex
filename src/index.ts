import Main from './pages/Main';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import ChangeProfile from './pages/ChangeProfile';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import ErrorPage from './pages/Error';
import Signup from './pages/Signup';
import Logout from './pages/Logout';

import { router } from './utils/Router';
import authController from './utils/controllers/auth';
import chatController from './utils/controllers/chat';
import { createStore, getState } from './utils/Store';

createStore({ user: {} });

class AuthErrorPage extends ErrorPage {
	constructor() {
		super({
			code: 401
		});
	}
}

function auth(block) {
	const { user = {} } = getState();

	if (user.id) {
		return block;
	}
	return AuthErrorPage;
}

router
	.use('/', () => Main)
	.use('/change-password', () => auth(ChangePassword))
	.use('/change-profile', () => auth(ChangeProfile))
	.use('/profile', () => auth(Profile))
	.use('/chat', () => auth(Chat))
	.use('/login', () => Login)
	.use('/signup', () => Signup)
	.use('/logout', () => Logout)
	.useError('/error', () => ErrorPage)
	.start();

authController.user().then(() => {
	chatController.request().then(() => router.go('/chat'));
});
