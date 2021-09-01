module.exports = {
	'roots': [
		'<rootDir>/src'
	],
	'testMatch': [
		'**/__tests__/**/*.+(ts|tsx|js)',
		'**/?(*.)+(spec|test).+(ts|tsx|js)'
	],
	'transform': {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	},
	'moduleNameMapper': {
		'^@constants(.*)$': '<rootDir>/src/constants$1',
		'^@models(.*)$': '<rootDir>/src/models$1',
		'^@utils(.*)$': '<rootDir>/src/utils$1',
	}
}
