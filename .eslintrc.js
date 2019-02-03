module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'func-names': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': ['error', { props: false }],
    'no-restricted-globals': ['error', 'event'],
    radix: ['error', 'as-needed'],
    'no-plusplus': 'off',
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'prefer-destructuring': ['error', {
      VariableDeclarator: { array: true, object: true },
      AssignmentExpression: { array: false, object: false },
    }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
