import { v4 as makeUUID } from 'uuid';

import _EventBus from '../eventBus';
import isEqual from '../isEqual';
import { IBlockProps } from './types';
import EventBus from '../eventBus';
import deepCopy from '../deepCopy';

class Block {
	private static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_CWU: 'flow:component-will-unmount',
		FLOW_SCU: 'flow:should-component-update',
		FLOW_RENDER: 'flow:render'
	};

	private _element: Element;
	protected _meta: { props: IBlockProps };
	private _parent: HTMLElement;
	private readonly _id: string;
	private readonly _eventBus: () => EventBus;
	protected readonly _props: IBlockProps;
	public readonly props: IBlockProps;
	public state: Record<string, any>;

	constructor(props?: Record<string, unknown>) {
		const _eventBus = new _EventBus();
		this._meta = {
			props
		};

		this._id = makeUUID();
		this._props = deepCopy(props);
		this.props = this._makePropsProxy({ events: {}, ...props });
		this.state = {};

		this._eventBus = () => _eventBus;

		this._registerEvents(_eventBus);
		_eventBus.emit(Block.EVENTS.INIT);
	}

	private _registerEvents(_eventBus) {
		_eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
		_eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		_eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		_eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
		_eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
		_eventBus.on(Block.EVENTS.FLOW_SCU, this._shouldComponentUpdate.bind(this));
	}

	private _createResources() {
		this._eventBus()
			.emit(Block.EVENTS.FLOW_RENDER)
			.then(() => this._eventBus().emit(Block.EVENTS.FLOW_CDM));
	}

	private _init() {
		this.init();
		this._createResources();
	}

	init() {
		return;
	}

	private _componentDidMount(): void {
		this.componentDidMount();
	}

	componentDidMount(): void {
		return;
	}

	private _componentDidUpdate(
		prevProps: IBlockProps,
		prevState: Record<string, any>
	) {
		this.componentDidUpdate(prevProps, prevState);
	}

	componentDidUpdate(
		prevProps: IBlockProps,
		prevState: Record<string, any>
	): void {
		return;
	}

	private _shouldComponentUpdate(
		oldProps: IBlockProps,
		nextProps: IBlockProps,
		oldState: Record<string, any>,
		nextState: Record<string, any>
	): void {
		const response = this.shouldComponentUpdate(nextProps, nextState);

		if (response) {
			const prevProps = deepCopy(this.props);
			const prevState = deepCopy(this.state);

			if (this.props.events) {
				Object.keys(this.props.events).forEach((eventName) => {
					this._element.removeEventListener(
						eventName,
						this.props.events[eventName]
					);
				});
			}

			Object.assign(oldProps, nextProps);
			Object.assign(oldState, nextState);

			this._eventBus()
				.emit(Block.EVENTS.FLOW_RENDER)
				.then(() => {
					this._eventBus().emit(Block.EVENTS.FLOW_CDU, prevProps, prevState);
				});
		}
	}

	shouldComponentUpdate(
		nextProps: IBlockProps,
		nextState: Record<string, any>
	): boolean {
		return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
	}

	setProps = (newProps?: IBlockProps): void => {
		if (!newProps) {
			return;
		}

		Object.assign(this.props, newProps);
	};

	setState = (newState?: Record<string, any>): void => {
		if (!newState) {
			return;
		}

		const nextState = Object.assign({}, this.state, newState);

		this._eventBus().emit(
			Block.EVENTS.FLOW_SCU,
			this.props,
			this.props,
			this.state,
			nextState
		);
	};

	get element(): Element {
		return this._element;
	}

	private _render(): void {
		const block = this.render();

		if (this._element && this._element.parentNode) {
			this._element.parentNode.replaceChild(block, this._element);
			delete this._element;
		}

		this._element = block;

		Object.keys(this.props.events).forEach((eventName) => {
			this._element.addEventListener(eventName, this.props.events[eventName]);
		});
	}

	render(): Element {
		return;
	}

	getContent(): Element {
		return this.element;
	}

	private _makePropsProxy = (props: IBlockProps) =>
		new Proxy(props, {
			get: (target: IBlockProps, prop: string) => {
				if (!prop.startsWith('_')) {
					return typeof target[prop] === 'function'
						? target[prop].bind(self)
						: target[prop];
				}

				return undefined;
			},
			set: (target: IBlockProps, prop: string, value: unknown): boolean => {
				if (!prop.startsWith('_') && target[prop] !== value) {
					const newProps = Object.assign({}, target, { [prop]: value });

					this._eventBus().emit(
						Block.EVENTS.FLOW_SCU,
						target,
						newProps,
						this.state,
						this.state
					);

					target[prop] = value;
				}

				return true;
			},
			deleteProperty(): never {
				throw new Error('Нет доступа');
			}
		});

	private _componentWillUnmount(): void {
		this.componentWillUnmount();
	}

	componentWillUnmount() {
		return;
	}

	getPlaceholderHtml(): string {
		return `<div data-id='${this._id}'></div>`;
	}

	insertInElement(element: HTMLElement): void {
		const el = element.querySelector(`[data-id='${this._id}']`);

		if (el) {
			el.parentNode.replaceChild(this.element, el);
		}
	}

	hide(): void {
		this.element.classList.add('hidden');
	}

	show(): void {
		this.element.classList.remove('hidden');
	}
}

export default Block;
