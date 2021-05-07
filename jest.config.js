module.exports = {
  testEnvironment: 'jsdom',
  cacheDirectory: './node_modules/.cache',
  verbose: true,
  globals: {
    __STATIC__: true,
    __DEV__: false,
    __TESTING__: true,
    __TESTINGHOST__: 'localhost',
    __TESTINGPORT__: 3332
  },
  clearMocks: true,
  collectCoverage: true,
  testRegex: '(\\.(test|spec))\\.(jsx|js)$',
  coverageDirectory: 'test/coverage',
  coverageThreshold: {
    global: {
      branches: 59,
      functions: 59,
      lines: 59,
      statements: 60
    }
  },
  testPathIgnorePatterns: [
    '/build/',
    '/etc/',
    '/node_modules/'
  ],
  moduleDirectories: [
    'src',
    'i18n',
    'test/json',
    'test/specs',
    'node_modules'
  ],
  setupFiles: [
    '<rootDir>/test/setup.jest.js'
  ],
  roots: [
    '<rootDir>/test/specs/pages',
    '<rootDir>/src/'
  ],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  }

};
