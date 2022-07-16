module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
    node: true, 
  },
  ignorePatterns: ["node_modules/", ".eslintrc.*", "package.json", "dist/", "helpers/"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "react/react-in-jsx-scope": ["off"],
    "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
    "no-const-assign": ["warn"],
    "no-dupe-else-if": ["error"],
    "no-unused-vars": ["warn"],
    "no-irregular-whitespace": ["error"],
    "camelcase": ["error"],
    "curly": ["warn"],
    "eqeqeq": ["warn"],
    "no-var": ["error"],
    "prefer-const": ["warn"],
    "react/prop-types": ["off"],
  },
  parserOptions: {
    parser: "babel-parser",
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
};
