module.exports = {
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
  ],
  coverageReporters: ['json', 'text', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
};
