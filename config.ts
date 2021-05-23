export const baseApiUrl = 'ya-praktikum.tech';
export const httpProtocol = 'https';
export const wsProtocol = 'wss';
export const staticDomain = `${httpProtocol}://${baseApiUrl}/api/v2/resources`;

export default {
	baseApiUrl,
	httpProtocol,
	wsProtocol,
	staticDomain,
	test: {
		serverPort: 4000
	}
};
