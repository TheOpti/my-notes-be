module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		'@typescript-eslint/no-empty-function': 0,
		quotes: [1, 'single'],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
