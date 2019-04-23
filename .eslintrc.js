module.exports = {
  root: true,

  env: {
    node: true,
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-alert': 'off',
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  plugins: [
    'graphql',
  ],

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],

  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript'
  ]
};
