// eslint-disable-next-line no-undef
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "eslint:recommended",
    ],
    "parser": "@babel/eslint-parser",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module",
        "babelOptions": {
            "presets": ["@babel/preset-react"]
        },
    },
    "rules": {
        "no-debugger": "warn",
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
