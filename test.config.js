/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: 'ts-jest',
  collectCoverage: true,
  testEnvironment: 'node',
  testMatch: [
    "<rootDir>/__tests__/api/**/*.test.ts"
]
};

module.exports = config;