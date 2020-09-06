module.exports = {
    roots: ['<rootDir>'],
    testMatch: ['**/?(*.)+(spec).+(ts|tsx|js|jsx)'],
    transform: {
        '^.+\\.(ts|tsx|js|jsx)?$': 'babel-jest',
        '^.+.(css|less)$': 'jest-transform-stub',
    },
    moduleNameMapper: {
        '.*\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
        '.*\\.(svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx', 'less', 'css', 'jsx'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    transformIgnorePatterns: ['<rootDir>.*(node_modules)(?!.*nav.*).*$'],
    collectCoverage: true,
    collectCoverageFrom: ['packages/felles/src/**/*.(ts|tsx|js|jsx)'],
    coveragePathIgnorePatterns: ['application-wrapper'],
    setupFilesAfterEnv: ['<rootDir>/setup/enzymeSetup.js'],
};

//'packages/prosess-beregningsgrunnlag/src/*.(ts|tsx|js|jsx)'
