import Block from '../../utils/Block';

import compile from '../../utils/compile';

import template from 'componentTemplates/Search.template.js';

import { ISearchProps } from './types';

export default class Search extends Block {
	constructor(props?: ISearchProps) {
		super({ id: 'search', placeholder: 'Поиск', ...props });
	}

	render() {
		return compile(template, this.props);
	}
}
