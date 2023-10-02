// import nextJest from 'next/jest.js'
const nextJest = require('next/jest.js');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: 'ts-jest',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverage: true,
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    "<rootDir>/__tests__/app/**/*.test.tsx"
  ]
};


// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config)