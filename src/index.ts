let scriptPath = window.location.pathname.slice(1) || 'main';

import(`/pages/${scriptPath}/index.js`).catch((err) => {
	// eslint-disable-next-line no-console
	console.error(err);
	scriptPath = 'error';
	// eslint-disable-next-line no-console
	import(`/pages/${scriptPath}/index.js`).catch(console.error);
});
