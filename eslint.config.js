import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'quotes': 'warn',
      'newline-before-return': 'warn',
      'no-lonely-if': 'error',

      'array-bracket-newline': ['off', 'consistent'],
      'array-bracket-spacing': ['warn', 'never'],
      'block-spacing': ['warn', 'always'],
      'function-call-argument-newline': ['warn', 'consistent'],
      'func-call-spacing': ['warn', 'never'],
      'function-paren-newline': ['warn', 'multiline-arguments'],
      'indent': ['warn', 2],
      'jsx-quotes': ['warn', 'prefer-double'],
      'max-depth': ['error', 4],
      'no-multi-assign': ['error'],

      'array-element-newline': [
        'off',
        {
          multiline: true,
          minItems: 2
        }
      ],

      'brace-style': [
        'warn',
        '1tbs',
        {
          allowSingleLine: true
        }
      ],

      'comma-dangle': [
        'warn',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
        }
      ],

      'comma-spacing': [
        'warn',
        {
          before: false,
          after: true
        }
      ],

      'key-spacing': [
        'error',
        {
          beforeColon: false,
          afterColon: true
        }
      ],

      'max-len': [
        'warn',
        100,
        2,
        {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        }
      ],

      'newline-per-chained-call': [
        'error',
        {
          ignoreChainWithDepth: 1
        }
      ],

      'no-multiple-empty-lines': [
        'warn',
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 0
        }
      ],
    },
  },
)
