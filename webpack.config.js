const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = require('./config/default');
module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.jsx', '.js', '.ts', '.json', '.less']
    },
    entry: {
        client: ['./app/index.tsx'],
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({template: './app/index.html'}),
        // new webpack.ProgressPlugin(handler), //打包进程
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        usedExports: true,
        noEmitOnErrors: true
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: config.clientPort,
        historyApiFallback: true,
        open: false,
        before: (app) => {
            app.use('/', async (req, res, next) => {
                await next();
            });
        },
    }
}