const MiniCssExtracPlugin = require("mini-css-extract-plugin");
const path = require("path");

// console.log(path.resolve(__dirname, "assets", "js"));
// console.log(__dirname);

module.exports = {
    entry: "./src/client/js/main.js",
    plugins: [new MiniCssExtracPlugin({
        filename: "css/styles.css",
        }),
    ],
    mode: "development",
    output: {
        filename: "js/main.js",
        path: path.resolve(__dirname, "assets"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                        ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test:/\.scss$/,
                use: [ MiniCssExtracPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
};