import Block from '../../utils/Block';
import Element from '../Element';

export default class Preloader extends Block {
	constructor(props) {
		super(props);
	}

	render() {
		return new Element({
			tagName: 'div',
			class: 'preloader'
		}).getContent();
	}
}
