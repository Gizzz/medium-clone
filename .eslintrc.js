module.exports = {
  "env": {
    "browser": true,
    "node": true,
  },
  "parser": "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "arrow-parens": "off",
    "camelcase": "off",
    "consistent-return": "off",
    "no-console": "off",
    "no-underscore-dangle": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],

    "react/forbid-prop-types": "off",

    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/alt-text": "off",
    "jsx-a11y/accessible-emoji": "off",
  },
};
