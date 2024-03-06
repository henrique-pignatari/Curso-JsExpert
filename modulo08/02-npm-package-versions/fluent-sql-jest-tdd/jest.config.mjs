/*
 * For a detailed explanation regarding each configuration property, visit:
 * https:
 */

export default {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  maxWorkers: "50%",
  testEnvironment: "node",

  watchPathIgnorePatterns: [
    "node_modules"
  ],

  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover"
  ],

  coverageThreshold: {
    global: {
      branch: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
};
