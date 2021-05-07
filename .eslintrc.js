module.exports = {
  parser: '@babel/eslint-parser',
  extends: [
    require.resolve('code-rule/dist/eslint'),
    'plugin:react-hooks/recommended'
  ],
  env: {
    browser: true,
    node: true,
    mocha: true,
    jest: true,
    es6: true
  },
  globals: {
    location: true,
    window: true,
    __TESTING__: true,
    __SERVERRENDER__: true,
    __STATIC__: true,
    __DEV__: true,
    __BASE_URL__: true,
    __MOBILE_SITE_ADDRESS__: true,
    __PREFIX_CLS__: true,
    mockStore: true,
    jest: true
  },
  rules: {
    'arrow-body-style': 0,
    'react/jsx-max-props-per-line': [1, { when: 'multiline' }],
    'no-param-reassign': [1,
      { props: true, ignorePropertyModificationsFor: ['draftState', 'draftData', 'draftValues'] }
    ],
    'button-has-type': 0,
    'react/jsx-filename-extension': [2, { allow: 'as-needed' }],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/named': 0,
    'react/no-array-index-key': 0
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './test/resolveConfig'
      }
    }
  }
};
