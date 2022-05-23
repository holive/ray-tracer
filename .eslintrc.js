'use strict';

module.exports = {
  root: true,
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  env: {
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
	  "plugin:prettier/recommended"
  ],
  rules: {
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: false },
    ],
	  'prettier/prettier': [
		  'error',
		  {
			  'singleQuote': true,
			  'semi': false,
			  'trailingComma': 'none'
		  }
	  ]
  },
};
