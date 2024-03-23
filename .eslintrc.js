module.exports = {
    root: true,
    extends: ['@react-native', 'plugin:@tanstack/eslint-plugin-query/recommended'],
    rules: {
        'prettier/prettier': 'off',
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
        '@typescript-eslint/no-unused-vars': 'off',
        'react-native/no-inline-styles': 'off',
        'no-extra-boolean-cast': 'off',
        eqeqeq: 'off',
        'no-alert': 'off',
        'no-unused-vars': 'off',
        'handle-callback-err': 'off',
        curly: 'off',
        quotes: 'off',
        'react/react-in-jsx-scope': 'off',
        'react/no-unstable-nested-components': [
            'warn',
            {
                allowAsProps: true,
            },
        ],
    },
};
