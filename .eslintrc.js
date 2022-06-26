// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const folders = fs
    .readdirSync('./', { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['simple-import-sort', 'import', '@typescript-eslint', 'unused-imports'],
    rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        'react/display-name': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-empty-interface': [
            'error',
            {
                'allowSingleExtends': false,
            },
        ],
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': 'error',
        'react/no-unescaped-entities': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports-ts': 2,
        '@typescript-eslint/no-explicit-any': 'off',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'import/newline-after-import': ['warn', { 'count': 1 }],
    },

    settings: {
        react: {
            version: 'detect',
        },
    },
    overrides: [
        {
            files: ['*.tsx', '*.ts'],
            rules: {
                'simple-import-sort/imports': [
                    'error',
                    {
                        groups: [
                            // Packages. react related packages come first.
                            // Things that start with a letter (or digit or underscore), or @ followed by a letter.
                            ['^react', '^@?\\w'],
                            // Absolute imports and Relative imports.
                            [
                                `^(${
                                    folders.map((item) => `@${item}`).join('|') + '|src/api'
                                })(/.*|$)`,
                                '^@?\\w',

                                '^@?\\w',
                            ],
                            // for scss imports.
                            ['^[^.]'],
                        ],
                    },
                ],
            },
        },
    ],
};
