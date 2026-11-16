require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const packageJson = require('./package.json');

module.exports = {
    entry: './src/index.js',
    target: 'web',
    mode: 'development',
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
        path: path.resolve(__dirname, 'dist-e2e'),
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
        new webpack.DefinePlugin({
            'process.env.CLERK_PUBLISHABLE_KEY': JSON.stringify(process.env.CLERK_PUBLISHABLE_KEY),
        }),
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
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist-e2e'),
        },
        port: 8081,
        open: false,
        hot: true,
        liveReload: false,
        client: {
            overlay: false,
        },
        historyApiFallback: true,
    },
    externals: {
        Config: JSON.stringify({
            appUrl: 'http://localhost:8081/',
            apiUrl: 'http://localhost:1338/parse',
            wsUrl: 'ws://localhost:1338',
            apiKey: 'test-app-id',
            apiId: 'test-app-id',
            liveQueryUrl: 'ws://localhost:1338/parse',
        }),
    },
};
