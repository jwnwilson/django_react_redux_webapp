module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "globals": {
        "window": false,
        "document": false
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "import/no-named-as-default": 0,
        "import/no-named-as-default-member": 0,
        "react/no-array-index-key": 0,
        "no-plusplus": 0,
        "prefer-template": 0
    },
    "plugins": [
        "react",
        "jest",
        "eslint-plugin-import"
    ]
};