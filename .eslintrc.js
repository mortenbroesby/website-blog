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
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },

  plugins: ["react", "@typescript-eslint", "unused-imports", "prettier"],

  rules: {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@next/next/link-passhref": "off",

    "no-duplicate-imports": "error",
  },
};
