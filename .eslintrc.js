/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // Default rule for production
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      excludedFiles: ['node_modules/**'],
      rules: {
        // When NODE_ENV=development, turn off unused vars errors
        ...(process.env.NODE_ENV === 'development' && {
          '@typescript-eslint/no-unused-vars': 'off',
          'no-unused-vars': 'off',
          'react/no-unescaped-entities': 'off',
          '@next/next/no-page-custom-font': 'off',
        }),
      },
    },
  ],
};
