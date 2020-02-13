module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                "targets": {
                    "esmodules": true,
                    "node": "current"
                }
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript'
    ],
    plugins: [
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true
            }
        ]
    ]
}