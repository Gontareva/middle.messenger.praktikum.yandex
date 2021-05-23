import Block from '../../utils/Block';

import compile from '../../utils/compile';
import { getData } from '../../utils/common';

import template from 'componentTemplates/Search.template.js';

import { ISearchProps } from './types';

export default class Search extends Block {
	constructor(props?: ISearchProps) {
		super({
			id: 'search',
			placeholder: 'Поиск',
			...props
		});
	}

	init() {
		this.setProps({
			events: {
				submit: this.onChange.bind(this)
			}
		});
	}

	onChange(event) {
		event.preventDefault();
		const title = getData(event.target)[this.props.id];

		this.props.onChange(title);
	}

	render() {
		return compile(template, this.props);
	}
}
