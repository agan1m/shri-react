module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTestsAfterEnv.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.js?(x)',
    '<rootDir>/server/**/__tests__/**/*.js?(x)',
    '<rootDir>/src/**/?(*.)(spec|test).js?(x)',
  ],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx|ts)$': '<rootDir>/node_modules/babel-jest',
    "^.+\\.ts?$": "ts-jest",
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$']
};
