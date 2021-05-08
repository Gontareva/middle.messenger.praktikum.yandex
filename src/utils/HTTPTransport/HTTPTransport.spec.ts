import { expect } from 'chai';
import HTTPTransport from './HTTPTransport';
import { XMLHttpRequest } from 'xmlhttprequest';
import ServerMock from '../../../test/ServerMock';
import config from '../../../config';

describe('HTTP', () => {
	const url = `http://localhost:${config.test.serverPort}/api`;
	let httpTransport;
	let serverInstance;

	before(() => {
		global.XMLHttpRequest = XMLHttpRequest;
		httpTransport = new HTTPTransport(url);

		serverInstance = new ServerMock();
		serverInstance.listen(config.test.serverPort);
	});

	it('should send get request', (done) => {
		httpTransport.get('/check').then(({ responseText }) => {
			const response = JSON.parse(responseText);

			expect(response.method).to.be.equal('GET');
			done();
		});
	});

	it('should send get request with data', (done) => {
		httpTransport
			.get('/check', { data: { param: 1 } })
			.then(({ responseText }) => {
				const response = JSON.parse(responseText);

				expect(response.method).to.be.equal('GET');
				expect(response.url).to.be.equal('/api/check?param=1');
				done();
			});
	});

	it('should send post request', (done) => {
		httpTransport
			.post('/check', { data: { param: 1 } })
			.then(({ responseText }) => {
				const response = JSON.parse(responseText);

				expect(response.method).to.be.equal('POST');
				expect(JSON.parse(response.body)).to.be.eql({ param: 1 });
				expect(response.url).to.be.equal('/api/check');
				done();
			});
	});

	it('should send put request', (done) => {
		httpTransport
			.put('/check', { data: { param: 1 } })
			.then(({ responseText }) => {
				const response = JSON.parse(responseText);

				expect(response.method).to.be.equal('PUT');
				expect(JSON.parse(response.body)).to.be.eql({ param: 1 });
				expect(response.url).to.be.equal('/api/check');
				done();
			});
	});

	it('should send delete request', (done) => {
		httpTransport
			.delete('/check', { data: { param: 1 } })
			.then(({ responseText }) => {
				const response = JSON.parse(responseText);

				expect(response.method).to.be.equal('DELETE');
				expect(JSON.parse(response.body)).to.be.eql({ param: 1 });
				expect(response.url).to.be.equal('/api/check');
				done();
			});
	});

	it('should change timeout request', (done) => {
		httpTransport.request('/check', {}, 10).then(({ timeout }) => {
			expect(timeout).to.be.equal(10);
			done();
		});
	});

	it('should catch error request', (done) => {
		httpTransport.get('/error').catch(({ status }) => {
			expect(status).to.be.equal(400);
			done();
		});
	});

	after(() => {
		serverInstance.server.close();
	});
});
