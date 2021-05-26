import Block, { IBlockProps } from '../../utils/Block';

import compile from '../../utils/compile';
import { getData, onSubmitForm } from '../../utils/common';
import Validator from '../../utils/validate';
import classnames from '../../utils/classnames';
import isEqual from '../../utils/isEqual';
import { modifiers } from '../../utils/styles';

// @ts-ignore
import template from './Form.template';

import { IFormProps } from './types';

import './Form.scss';

export default class Form extends Block {
	validator?: Validator;

	constructor(props: IFormProps) {
		super(props);
	}

	componentDidMount(): void {
		if (this.props.schema) {
			this.validator = new Validator(this.props.schema, this.onErrorsChange);
			this.validator.addListeners(this.element);
		}

		this.setProps({
			events: {
				submit: this.onSubmitForm.bind(this),
				change: this.onChange.bind(this)
			}
		});
	}

	shouldComponentUpdate(nextProps: IBlockProps): boolean {
		const equal = isEqual(this.props, nextProps);

		if (!equal && this.validator) {
			this.validator.detachListeners();
		}

		return !equal;
	}

	componentDidUpdate(): void {
		if (this.validator) {
			this.validator.addListeners(this.element);
		}
	}

	onChange = (event: Event): void => {
		event.preventDefault();

		const { change } = this._props.events || {};

		if (change && typeof change === 'function') {
			change(getData(event.currentTarget));
		}
	};

	onSubmitForm = (event: Event): void => {
		event.preventDefault();

		if (!this.validator || this.validator.validate()) {
			const data = onSubmitForm(event);

			const { submit } = this._meta.props.events;

			if (submit && typeof submit === 'function') {
				submit(data);
			}
		}
	};

	onErrorsChange = (errors: Record<string, string>): void => {
		this.setProps({ errors });
	};

	render(): Element {
		const { errors = {}, theme, render } = this.props;
		const { className, ...props } = render(errors);

		const classes = classnames(className, theme && modifiers('form', [theme]));

		return compile(template, {
			className: classes,
			...props
		});
	}
}
