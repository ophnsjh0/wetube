const MiniCssExtracPlugin = require("mini-css-extract-plugin");
const path = require("path");
const BASE_JS ="./src/client/js/";

// console.log(path.resolve(__dirname, "assets", "js"));
// console.log(__dirname);

module.exports = {
    entry: {
        main: BASE_JS + "main.js",
        videoPlayer: BASE_JS + "videoPlayer.js",
        recorder: BASE_JS + "recorder.js",
        commentSection: BASE_JS + "commentSection.js",
    },
    plugins: [new MiniCssExtracPlugin({
        filename: "css/styles.css",
        }),
    ],
    mode: "development",
    watch: true,
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "assets"),
        clean: true,
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