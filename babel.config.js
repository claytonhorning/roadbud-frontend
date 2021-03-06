module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                cwd: 'babelrc',
                root: './src',
            },
        ],
        ['module:react-native-dotenv'],
        ['react-native-reanimated/plugin'],
    ],
}
