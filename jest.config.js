// module.exports = {
//   // preset: 'ts-jest',
//   testEnvironment: 'node',
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//   testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
//   moduleNameMapper: {
//     '^@components(.*)$': '<rootDir>/components$1',
//     '^@pages(.*)$': '<rootDir>/pages$1',
//     '^@hooks(.*)$': '<rootDir>/hooks$1',
//     '\\.(scss|sass|css)$': 'identity-obj-proxy',
//   },
// };

// module.exports = {
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//   testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
//   moduleNameMapper: {
//     '^@components(.*)$': '<rootDir>/components$1',
//     '^@pages(.*)$': '<rootDir>/pages$1',
//     '^@hooks(.*)$': '<rootDir>/hooks$1',
//   },
// };

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
