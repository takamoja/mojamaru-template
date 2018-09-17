const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const IS_ENVIRONMENT = process.env.NODE_ENV;
const IS_DEVELOPMENT = IS_ENVIRONMENT === 'development' ? true : false;

module.exports = {
    mode: IS_ENVIRONMENT,
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: [
            './assets/js/app.js',
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client'
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'public/assets/js'),
        publicPath: '/',
    },
    devtool: IS_DEVELOPMENT ? 'source-map' : 'none',
    // devServer: {
    //     open: true,
    //     openPage: 'index.html',
    //     contentBase: path.resolve(__dirname, 'public'),
    //     watchContentBase: true,
    //     disableHostCheck: true,
    //     host: EXTERNAL_HOST,
    //     port: 3000,
    // },
    performance: {
        hints: IS_DEVELOPMENT ? false : 'warning'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            minimize: IS_DEVELOPMENT ? false : true,
                            sourceMap: IS_DEVELOPMENT ? true : false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: IS_DEVELOPMENT ? true : false,
                            plugins: [
                                require('autoprefixer')({
                                    grid: true,
                                    'browsers': [
                                        '> 1%',
                                        'IE 11',
                                    ]
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEVELOPMENT ? true : false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ManifestPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '../css/style.css',
        }),
    ],
    optimization: {
        minimizer: IS_DEVELOPMENT
            ? []
            : [
                new UglifyJSPlugin({
                    parallel: true,
                })
            ]
    }
};
