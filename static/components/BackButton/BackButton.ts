import Block from '../../utils/Block';

import compile from '../../utils/compile';

import template from '../../../dist/templates/BackButton.template.js';

export default class BackButton extends Block {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.setProps({
			events: {
				click: this.onBackButtonClick.bind(this)
			}
		});
	}

	onBackButtonClick() {
		window.history.back();
	}

	render() {
		return compile(template, this.props);
	}
}
