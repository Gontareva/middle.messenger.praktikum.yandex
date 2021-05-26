import { createServer, Server } from 'http';

export default class ServerMock {
	public server: Server;

	constructor() {
		this.server = createServer((req, res) => {
			if (req.url.endsWith('/error')) {
				res.statusCode = 400;
				return res.end('Error');
			}

			const body = [];

			if (
				req.method === 'POST' ||
				req.method === 'PUT' ||
				req.method === 'DELETE'
			) {
				req
					.on('data', (chunk) => {
						body.push(chunk);
					})
					.on('end', () => {
						res.end(
							JSON.stringify({
								method: req.method,
								url: req.url,
								body: Buffer.concat(body).toString()
							})
						);
					});
			} else {
				res.end(
					JSON.stringify({
						method: req.method,
						url: req.url
					})
				);
			}
		});
	}

	listen(...params: any[]): void {
		this.server.listen(...params);
	}
}
