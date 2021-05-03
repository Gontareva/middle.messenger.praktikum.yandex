import { router } from './utils/Router';
import Main from './pages/Main';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import ChangeProfile from './pages/ChangeProfile';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import ErrorPage from './pages/Error';
import Signin from './pages/Signin';

// let scriptPath = window.location.pathname.slice(1) || 'main';
//
// import(`/pages/${scriptPath}/index.js`).catch((err) => {
// 	// eslint-disable-next-line no-console
// 	console.error(err);
// 	scriptPath = 'error';
// 	// eslint-disable-next-line no-console
// 	import(`/pages/${scriptPath}/index.js`).catch(console.error);
// });

router
	.use('/', Main)
	.use('/change-password', ChangePassword)
	.use('/change-profile', ChangeProfile)
	.use('/profile', Profile)
	.use('/chat', Chat)
	.use('/login', Login)
	.use('/signin', Signin)
	.useError('/error', ErrorPage)
	.start();
