import Block from '../../utils/Block';
import NodeElement from '../NodeElement';

export default class Preloader extends Block {
	constructor(props) {
		super(props);
	}

	render() {
		return new NodeElement({
			tagName: 'div',
			class: 'preloader'
		}).getContent();
	}
}
