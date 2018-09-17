const serve = require('webpack-serve');
const config = require('./webpack.config.js');
const argv = {};
const options = {
    config,
    open: true,
    host: '127.0.0.1',
    port: 8080,
    reload: true,
    hotClient: true
};

serve(argv, options);
