module.exports = {
    extends: ["plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    root: true,
    rules: {
        //"es/no-arrow-functions": "error",
        //"es/no-block-scoped-functions": "error",
        //"es/no-classes": "error",
        //"es/no-default-parameters": "error",
        "@typescript-eslint/ban-types": "warn",
        "no-inner-declarations": "error",
        "no-dupe-args": "error",
        "no-empty": [
            "error",
            {
                allowEmptyCatch: true,
            },
        ],
        "no-unused-vars": "off",
        indent: ["error", 4],
        quotes: [
            "error",
            "double",
            {
                allowTemplateLiterals: true,
            },
        ],
        semi: ["error", "never"],
    },
}
