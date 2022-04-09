/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // Automatically clear mock calls, instances and results before every tests
  clearMocks: true,
  // A path to a module which exports an async function that is triggered once before all tests suites
  globalSetup: './tests/global-setup.ts',

  // A path to a module which exports an async function that is triggered once after all tests suites
  globalTeardown: './tests/global-teardown.ts',

  // An array of file extensions your modules use
  moduleFileExtensions: [
    'js',
    'ts',
    'node'
  ],

  // The root directory that Jest should scan for tests and modules within
  // rootDir: './tests',

  // A list of paths to directories that Jest should use to search for files in
  roots: [
    '<rootDir>/tests/',
    '<rootDir>/src/'
  ],

  modulePaths: [
    '<rootDir>/src/'
  ],

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: [
    'node_modules',
    'src'
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  // Allows you to use a custom runner instead of Jest's default tests runner
  // runner: "jest-runner",

  // The paths to modules that run some code to configure or set up the testing environment before each tests
  // setupFiles: [
  //   '<rootDir>/tests/env-setup.ts',
  //   'module-alias/register'
  // ],

  // A list of paths to modules that run some code to configure or set up the testing framework before each tests
  // setupFilesAfterEnv: [],

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transform: {
    '^.+\\.(ts)$': '<rootDir>/node_modules/babel-jest',
  },

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // unmockedModulePathPatterns: undefined,

  // Indicates whether each individual tests should be reported during the run
  verbose: true
}
