import Block from '../../utils/Block';
import NodeElement from '../NodeElement';

import './Preloader.scss';

export default class Preloader extends Block {
	constructor(props) {
		super(props);
	}

	render(): Element {
		return new NodeElement({
			tagName: 'div',
			class: 'preloader'
		}).getContent();
	}
}
