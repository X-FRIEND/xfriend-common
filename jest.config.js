module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageThreshold: {
    "global": {
      "branches": 90,
      "functions": 90,
      "lines": 90,
      "statements": 90
    }
  },
  reporters: ["default"],
  testMatch: ["**/?(*.)(spec).ts?(x)"],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/index.ts',
    '!<rootDir>/src/lib/custom-error-constants.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    "text-summary",
    "lcov"
  ],
  testPathIgnorePatterns: ["build"]
}