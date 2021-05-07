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
import { createStore } from './utils/Store';

createStore({ user: {} });

router
	.use('/', Main)
	.use('/change-password', ChangePassword)
	.use('/change-profile', ChangeProfile)
	.use('/profile', Profile)
	.use('/chat', Chat)
	.use('/login', Login)
	.use('/signup', Signup)
	.use('/logout', Logout)
	.useError('/error', ErrorPage)
	.start();

authController.user().then(() => {
	chatController.request();
});
