module.exports = {
  setupFiles: [
    '<rootDir>/tests/unit/init.js'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '@nuxtjs/composition-api': '@nuxtjs/composition-api/lib/cjs/entrypoint.js'
  },
  moduleFileExtensions: ['js', 'vue'],
  testMatch: [
    '**/(*.)test.(js)'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(babel-jest|jest-vue-preprocessor)/)'
  ],
  snapshotSerializers: ['jest-serializer-vue'],
  coverageReporters: ['html', 'text-summary'],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  collectCoverageFrom: [
    'components/**/*.vue',
    'pages/**/*.vue',
    '!**/node_modules/**'
  ]
}
