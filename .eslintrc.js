module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    camelcase: ['error', { allow: ['sale_id'] }],
    'class-methods-use-this': [2, { exceptMethods: ['mounted'] }],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
