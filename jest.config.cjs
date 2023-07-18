module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js}',
    '!<rootDir>/src/**/presenters/**/*',
    '!<rootDir>/src/**/test/**/*',
    '!<rootDir>/src/**/index.js',
    '!**/*.d.js',
  ],
  globalSetup: '<rootDir>/jest-config/setup.cjs',
  globalTeardown: '<rootDir>/jest-config/teardown.cjs',
  setupFilesAfterEnv: ['<rootDir>/jest-config/setup-jest.js'],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy',
  },
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
}
