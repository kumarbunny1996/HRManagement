const path = require('path');

module.exports = {
    entry: './client/src/js/main.js',
    output: {
        path: path.resolve(`${__dirname}/client/src`, 'dist'),
        filename: 'bundle.js',
    },
    watch: process.env.NODE_ENV !== 'production',
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }

};