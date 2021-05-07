import HTTPTransport from '../http';
import { BaseAPI } from './base';
import { baseApiUrl, httpProtocol } from '../../../config';

const resourcesAPIInstance = new HTTPTransport(
	`${httpProtocol}://${baseApiUrl}/api/v2/resources`
);

export default class ResourcesAPI extends BaseAPI {
	save(data: FormData): Promise<unknown> | never {
		return resourcesAPIInstance
			.post('', { data, isFormData: true })
			.then(({ response }) => JSON.parse(response));
	}
}
