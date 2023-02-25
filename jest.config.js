module.exports = {
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
  testMatch: ["**/?(*.)(spec).js?(x)"],
  collectCoverageFrom: ['<rootDir>/src/**/*.js', '!<rootDir>/src/index.js'],
  coverageDirectory: 'coverage',
  coverageReporters: [
    "text-summary",
    "lcov"
  ],
  testPathIgnorePatterns: ["build"]
}