const webpack = require('webpack');

const config = {
    context: __dirname + "/src",
    entry: ['./index.js'],
    output: {
        filename: 'bundle.js',
        path: __dirname + '/lib'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ],

    },
    devServer: {
        contentBase: __dirname + "/src"
    }
};

module.exports = config;