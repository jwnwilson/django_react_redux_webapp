module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "globals": {
        "window": false,
        "document": false,
        "fetch": false,
    },
    "rules": {
        "import/no-named-as-default": 0,
        "import/no-named-as-default-member": 0,
        "react/no-array-index-key": 0,
        "react/destructuring-assignment": 0,
        "react/jsx-no-target-blank": 0,
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/forbid-prop-types": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "jsx-a11y/label-has-for": 0,
        "jsx-a11y/label-has-associated-control": 0,
        "no-plusplus": 0,
        "prefer-template": 0,
        "no-underscore-dangle": 0,
        "class-methods-use-this": 0,
        "react/jsx-curly-brace-presence": 0,
        "react/jsx-one-expression-per-line": 0,
        "react/jsx-closing-tag-location": 0,
    },
    "plugins": [
        "react",
        "jest",
        "eslint-plugin-import"
    ]
};