module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true
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
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'project': './tsconfig.json',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  plugins: ['react', 'react-hooks', 'react-refresh', '@typescript-eslint', 'import', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-debugger": "off",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "class-methods-use-this": "off",
    "import/extensions": "off",
    "prettier/prettier": "error",
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/array-type": [
      "error",
      {
        "default": "array"
      }
    ],
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        "accessibility": "explicit",
        "overrides": {
          "accessors": "explicit",
          "constructors": "off",
          "methods": "explicit",
          "properties": "explicit",
          "parameterProperties": "explicit"
        }
      }
    ],
    "max-lines-per-function": ["error", { "max": 40, "skipBlankLines": true }],
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "curly": ["error", "all"],
    "@typescript-eslint/lines-between-class-members": "off",
    "@typescript-eslint/no-this-alias": [
      "error",
      {
        "allowDestructuring": true,
        "allowedNames": ["context"]
      }
    ],
  },
}
