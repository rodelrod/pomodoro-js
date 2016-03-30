// Promise polyfill necessary to have CSS loader in node 0.10
require('es6-promise').polyfill();
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: "./app/main.js",
    output: {
        filename: "public/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
        ]
    },
    // Fix for npm vex require: https://github.com/webpack/webpack/issues/1344
    resolve: {
        alias: {
            vex: 'vex-js'
        }
    },
    plugins: [
        new ExtractTextPlugin("public/css/bundle.css")
    ]
};
