module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  transform: {
    '^.+\\.svg$': '<rootDir>/svgTransform.js',
    '^.+\\.(j|t)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!echarts|variables)'],
  moduleDirectories: ['node_modules', 'src'],
};
