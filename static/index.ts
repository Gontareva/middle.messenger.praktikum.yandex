const scriptPath = window.location.pathname.slice(1) || 'main';

import(`/pages/${scriptPath}/index.js`).catch((err) => {
	console.error(err);
	// @ts-ignore
	import('/pages/error').catch(console.error);
});
