module.exports = {
  env: {
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:jest/recommended',
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
};
