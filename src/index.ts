import Main from './pages/Main';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import ChangeProfile from './pages/ChangeProfile';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import ErrorPage from './pages/Error';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import Notification from './components/Notification';

import { router } from './utils/Router';
import authController from './utils/controllers/auth';
import chatController from './utils/controllers/chat';
import { createStore, dispatch } from './utils/Store';
import { renderPage } from './utils/common';
import { auth } from './utils/authMiddleware';

import './styles/main.scss';
import { errorHandler } from './utils/errorHandler';
import notificationsController from './utils/controllers/notifications';

createStore({ user: {} });

router
	.use('/', 'Messenger', () => Main)
	.use('/change-password', 'Изменить пароль', () => auth(ChangePassword))
	.use('/change-profile', 'Изменить профиль', () => auth(ChangeProfile))
	.use('/profile', 'Профиль', () => auth(Profile))
	.use('/chat', 'Чат', () => auth(Chat))
	.use('/login', 'Авторизация', () => Login)
	.use('/signup', 'Регистрация', () => Signup)
	.use('/logout', 'Выход', () => Logout)
	.useError('/error', 'Ошибка', () => ErrorPage)
	.start();

authController.user().then(() => {
	chatController.request().then(() => router.go('/chat'));
});

renderPage('#notification', new Notification());

window.addEventListener('online', () =>
	notificationsController.add('Вы снова online!')
);
window.addEventListener('offline', () =>
	notificationsController.add('Нет сети...')
);
