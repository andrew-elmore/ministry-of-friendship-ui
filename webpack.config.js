const path = require('path');
const packageJson = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    target: 'web',
    mode: process.env.NODE_ENV || 'development',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    minSize: 60000,
                    maxSize: 240000,
                },
                domain: {
                    test: /domain/,
                    name: 'domain',
                    chunks: 'all',
                    minSize: 60000,
                    maxSize: 240000,
                    enforce: true,
                },
                img: {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    name: 'img',
                    chunks: 'all',
                    minSize: 60000,
                    maxSize: 240000,
                    enforce: true,
                },
                main: {
                    name: 'main',
                    chunks: 'all',
                    minSize: 60000,
                    maxSize: 240000,
                    enforce: true,
                },
            },
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `bundle-[name].[contenthash].${packageJson.version}.js`,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|gif|svg|pdf)$/,
                use: [{ loader: 'url-loader', options: { limit: 100000 } }],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            actions: path.resolve(__dirname, 'src/actions'),
            components: path.resolve(__dirname, 'src/components'),
            domain: path.resolve(__dirname, 'src/domain'),
            utils: path.resolve(__dirname, 'src/utils'),
            views: path.resolve(__dirname, 'src/views')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/img', to: 'img' }
            ],
        }),
    ],
    // devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
    devtool: 'source-map', // used for highly accurate source maps, but very slow rebuilds
    // devtool: 'cheap-module-eval-source-map', // Pretty accurate source maps, with fast rebuilds.
    // devtool: 'eval', // not very accurate source maps, but very fast rebuilds.
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 3000,
        open: true,
        hot: true,
        liveReload: false,
        client: {
            overlay: false,  // Disable the error overlay
        },
        historyApiFallback: true,
    },
    externals: {
        Config: JSON.stringify({
            appUrl: 'http://localhost:3000/',
            apiUrl: 'http://localhost:1338/api',
            wsUrl: 'ws://localhost:1338',
            apiKey: 'myJSKey',
            apiId: 'myAppId',
        }),
    },
};
