module.exports = {
  env: {
    node: true,
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  // parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2020,
  },
  // plugins: [],
  rules: {
    'no-console': 'off', // "warn" // "off"
  },
  settings: {},
}
