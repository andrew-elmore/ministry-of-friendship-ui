module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.js?(x)',
    '**/?(*.)+(spec|test).js?(x)'
  ],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/tests/helpers/styleMock.js',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/tests/helpers/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@actions/(.*)$': '<rootDir>/src/actions/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1'
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/tests/helpers/setup.js'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.stories.js',
    '!src/index.js',
    '!**/node_modules/**'
  ],
  coverageThresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  coverageDirectory: '<rootDir>/coverage',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  verbose: true
};
