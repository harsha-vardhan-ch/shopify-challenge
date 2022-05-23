module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript'
    ],
    plugins: [
        [
            'module-resolver',
            {
                'root': ['./src'],
                alias: {
                    '@src': './src',
                    '@shared': './src/shared',
                    '@repositories': './src/repositories',
                    '@modules': './src/modules',
                    '@entities': './src/entities',
                }
            }
        ],
        'babel-plugin-transform-typescript-metadata',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
    ]
}
