const jsRules = {
  'import/no-unresolved': 0,
  'import/extensions': 0,
  'import/no-cycle': 0,
  'import/no-extraneous-dependencies': 0,
  'import/prefer-default-export': 0,
  'import/no-mutable-exports': 0,
  'no-nested-ternary': 0,
  'no-template-curly-in-string': 0,
  'no-restricted-syntax': 0,
  'new-cap': 0,
  'compat/compat': 0,
  'comma-dangle': 0,
  'no-param-reassign': 0, // TODO: remove later
  'no-underscore-dangle': 0,
  'no-unused-vars': 0,
  'no-use-before-define': 0,
  'no-console': 0,
  'func-names': 0,
  camelcase: 0,
  'class-methods-use-this': 0,
  'prefer-rest-params': 0,
  'global-require': 0,
  // for (let i = 0; i < len; i++)
  'no-plusplus': 0,
  // https://eslint.org/docs/rules/no-continue
  // labeledLoop is conflicted with `eslint . --fix`
  'no-continue': 0,
  // ban this for Number.isNaN needs polyfill
  'no-restricted-globals': 0,
  'max-classes-per-file': 0,
  'no-fallthrough': 0,
  'no-shadow': 0,

  // js 可以忽略的一些 rules
  // 之后在 tsRules 中会被覆盖
  'prefer-template': 0,
  'no-else-return': 0,
  'consistent-return': 0,
  'prefer-destructuring': 0,
  'no-new-func': 0,
  'prefer-const': 0,
};

const tsRules = {
  // 覆盖之前 jsRules 中的部分 rules
  'prefer-template': 1,
  'consistent-return': 1,
  'prefer-const': 1,
  'eslintprefer-destructuring': 0,
  'react/jsx-one-expression-per-line': 0,
  'react/react-in-jsx-scope': 0,
  'react/prop-types': 0,
  'react/forbid-prop-types': 0,
  'react/jsx-indent': 0,
  'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
  'react/jsx-filename-extension': 0,
  'react/state-in-constructor': 0,
  'react/jsx-props-no-spreading': 0,
  'react/require-default-props': 0,
  'react/sort-comp': 0,
  'react/display-name': 0,
  'react/static-property-placement': 0,
  'react/no-find-dom-node': 0,
  'react/no-unused-prop-types': 0,
  'react/default-props-match-prop-types': 0,
  'react-hooks/rules-of-hooks': 2, // Checks rules of Hooks
  'react-hooks/exhaustive-deps': 'warn',
  'react/button-has-type': 0,
  'react/no-danger': 0,
  'react/no-access-state-in-setstate': 0,
  'react/no-array-index-key': 0,
  // eslint-config-airbnb 的函数式组件报错，关闭这个检查
  'react/function-component-definition': [
    'off',
    {
      namedComponents: 'function-expression',
      unnamedComponents: 'function-expression',
    },
  ],
  'jsx-a11y/no-static-element-interactions': 0,
  'jsx-a11y/anchor-has-content': 0,
  'jsx-a11y/click-events-have-key-events': 0,
  'jsx-a11y/anchor-is-valid': 0,
  'jsx-a11y/no-noninteractive-element-interactions': 0,

  // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692866111
  'no-use-before-define': 0,
  '@typescript-eslint/no-use-before-define': 0,
  '@typescript-eslint/no-shadow': 0,
  // https://github.com/typescript-eslint/typescript-eslint/issues/2528#issuecomment-689369395
  'no-undef': 0,
  'no-return-await': 0,
};

module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['airbnb', 'prettier'],
  root: true,
  // parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
  },
  // plugins: ["react", "@typescript-eslint"],
  rules: jsRules,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'airbnb',
        'prettier',
        'plugin:compat/recommended',
        'plugin:react/recommended',
        'plugin:import/typescript',
      ],
      plugins: ['react', 'babel', '@typescript-eslint', 'react-hooks'],
      rules: {
        ...jsRules,
        ...tsRules,
      },
    },
  ],
};
