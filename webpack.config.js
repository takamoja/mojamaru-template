// const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
    const IS_ENVIRONMENT = argv.mode === 'development';
    return {
        watch: IS_ENVIRONMENT ? true : false,
        entry: '/src/assets/js/app.js',
        output: {
            filename: 'bundle.js',
            path: path.join(__dirname, 'public/assets/js')
        },
        devtool: IS_ENVIRONMENT ? 'source-map' : 'none',
        module: {
            rules: [
                {
                    test: /\.txt$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['env', {module: false}]]
                        }
                    }
                },
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader'
                }
            ]
        },
        optimization: {
            minimizer: IS_ENVIRONMENT
                ? []
                : [
                    new UglifyJSPlugin({
                        uglifyOptions: {
                            compress: {
                                drop_console: true
                            }
                        }
                    })
                ]
        }
    };
};
