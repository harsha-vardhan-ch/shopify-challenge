/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    // Stop running tests after `n` failures
    bail: true,

    // Automatically clear mock calls, instances and results before every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',

    // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
    moduleNameMapper: {
        '@src/(.*)': '<rootDir>/src/$1',
        '@shared/(.*)': '<rootDir>/src/shared/$1',
        '@repositories/(.*)': '<rootDir>/src/repositories/$1',
        '@modules/(.*)': '<rootDir>/src/modules/$1',
        '@entities/(.*)': '<rootDir>/src/entities/$1',
        '@integration/(.*)': '<rootDir>/src/integration/$1',
    },

    // A preset that is used as a base for Jest's configuration
    preset: 'ts-jest',

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/**/*.spec.ts'],
};
