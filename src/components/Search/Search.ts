import Block from '../../utils/Block';

import compile from '../../utils/compile';
import { getData } from '../../utils/common';

// @ts-ignore
import template from './Search.template';

import { ISearchProps } from './types';

import './Search.scss';

export default class Search extends Block {
	constructor(props?: ISearchProps) {
		super({
			id: 'search',
			placeholder: 'Поиск',
			...props
		});
	}

	init(): void {
		this.setProps({
			events: {
				submit: this.onChange.bind(this)
			}
		});
	}

	onChange(event: Event): void {
		event.preventDefault();
		const title = getData(event.target)[this.props.id];

		this.props.onChange(title);
	}

	render(): Element {
		return compile(template, this.props);
	}
}
