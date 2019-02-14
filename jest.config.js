module.exports = {
  "preset": 'ts-jest',
  "roots": [
    "<rootDir>/test"
  ],
  "moduleDirectories": [
    "node_modules",
    "<rootDir>/src"
  ],
  setupFilesAfterEnv: ["<rootDir>/test/scripts/testSetup.ts"]
};