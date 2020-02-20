module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                "targets": {
                    "esmodules": true,
                    "node": "current",
                }
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true
            }
        ],
        [
            'import', {
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
            }, 'vant'
        ], 
        '@babel/plugin-proposal-class-properties'
    ]
}