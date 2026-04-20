const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})

const config = {
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom'
}

module.exports = createJestConfig(config)
