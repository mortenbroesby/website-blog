module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },

  settings: {
    react: {
      version: "detect",
    },
  },

  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "next/core-web-vitals",
    "next",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },

  plugins: [
    "react",
    "@typescript-eslint",
    "unused-imports",
    "react-hooks",
    "prettier",
  ],

  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
  },
};
