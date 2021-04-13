import Page from '../../components/Page';

import template from 'pageTemplates/Error.template.js';

const page = new Page({
	title: 'Ошибка',
	template,
	render: () => ({
		code: 404,
		message: 'Не туда попали'
	})
});

export default page;
