/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],

  rules: {
    'vue/multi-word-component-names': true
  },

  parserOptions: {
    ecmaVersion: 'latest'
  }
}
