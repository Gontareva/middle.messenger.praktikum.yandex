const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
	fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8')
);

module.exports = {
	extends: [
		'prettier',
		'plugin:@typescript-eslint/recommended'
	],
	plugins: ['prettier', '@typescript-eslint'],
	env: {
		browser: true,
		node: true,
		es6: true
	},
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	rules: {
		'prettier/prettier': ['error', prettierOptions],
		'arrow-body-style': [2, 'as-needed'],
		'class-methods-use-this': 0,
		'comma-dangle': [2, 'never'],
		curly: [2, 'all'],
		'import/imports-first': 0,
		'import/newline-after-import': 0,
		'import/no-dynamic-require': 0,
		'import/no-extraneous-dependencies': 0,
		'import/no-named-as-default': 0,
		'import/no-unresolved': [0],
		'import/no-webpack-loader-syntax': 0,
		'import/prefer-default-export': 0,
		indent: [
			'error',
			'tab',
			{
				SwitchCase: 1
			}
		],
		'max-len': 0,
		'newline-per-chained-call': 0,
		'no-confusing-arrow': 0,
		'no-console': 2,
		'no-shadow': 1,
		'no-underscore-dangle': [1, { allow: ['_id'] }],
		'no-unused-vars': 1,
		'no-use-before-define': 0,
		'id-length': ['error', { min: 2, exceptions: ['_'] }],
		'prefer-template': 2,
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/ban-ts-comment': 0
	},
	settings: {
		'import/resolver': {
			node: {
				paths: ['./'],
				extensions: ['.js']
			}
		}
	}
};
