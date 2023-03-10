module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:vue/essential',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    // 禁止使用 var
    'no-var': 'error',
    // 强制组件使用横杆写法
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    // 强制变量使用驼峰命名
    camelcase: ['error', { properties: 'always' }],
    // 优先使用 const
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }
    ],
    'no-unsafe-optional-chaining': 'off'
  }
};
