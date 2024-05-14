module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', 'react-refresh', '@typescript-eslint', 'import', 'prettier'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-debugger': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array',
      },
    ],
    'max-lines-per-function': ['error', { max: 40, skipBlankLines: true }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    curly: ['error', 'all'],
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: true,
        allowedNames: ['context'],
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/jsx-no-constructed-context-values': 'off',
  },
  "overrides": [
    {
      "files": ["*.tsx"],
      "rules": {
        "max-lines-per-function": ["error", { max: 120 }]
      }
    }
  ]
};
