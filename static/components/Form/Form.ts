import Block, { IBlockProps } from '../../utils/Block';

import compile from '../../utils/compile';
import { getData, onSubmitForm } from '../../utils/common';
import Validator from '../../utils/validate';
import isEqual from '../../utils/isEqual';

import template from '../../../dist/templates/Form.template.js';

import { IFormProps } from './types';
import { modifiers } from '../../utils/styles';
import classnames from '../../utils/classnames';

export default class Form extends Block {
	validator?: Validator;

	constructor(props: IFormProps) {
		super(props);
	}

	init() {
		if (this.props.schema) {
			this.validator = new Validator(
				this.props.schema,
				this.onErrorsChange.bind(this)
			);
		}
	}

	componentDidMount() {
		super.componentDidMount();

		this.setProps({
			events: {
				submit: this.onSubmitForm.bind(this),
				change: this.onChange.bind(this)
			}
		});
	}

	shouldComponentUpdate(oldProps: IBlockProps, newProps: IBlockProps) {
		const equal = isEqual(oldProps, newProps);

		if (!equal && this.validator) {
			this.validator.detachListeners();
		}

		return !equal;
	}

	componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps) {
		super.componentDidUpdate(oldProps, newProps);

		if (this.validator) {
			this.validator.addListeners(this.element);
		}
	}

	onChange(event: Event): void {
		const { change } = this._props.events || {};

		if (change) {
			change(getData(event.currentTarget));
		}
	}

	onSubmitForm(event: Event) {
		if (!this.validator || this.validator.validate()) {
			const data = onSubmitForm(event);

			const { submit } = this._meta.props.events;

			if (submit) {
				submit(data);
			}
		}

		event.preventDefault();
	}

	onErrorsChange(errors) {
		this.setProps({ errors });
	}

	render() {
		const { errors = {}, theme, render } = this.props;
		const { className, ...props } = render(errors);

		const classes = classnames(className, theme && modifiers('form', [theme]));

		return compile(template, {
			className: classes,
			...props
		});
	}
}
