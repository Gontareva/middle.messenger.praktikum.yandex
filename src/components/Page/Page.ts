import Block from '../../utils/Block';

import { renderPage } from '../../utils/common';
import compile from '../../utils/compile';

import { IPageProps } from './types';

export default class Page extends Block {
	props: IPageProps;

	constructor(props: IPageProps) {
		super({
			render: () => null,
			...props
		});
		document.title = props.title;
	}

	componentDidMount() {
		renderPage(this);
	}

	render() {
		const { template, render } = this.props;

		return compile(template, render());
	}
}
