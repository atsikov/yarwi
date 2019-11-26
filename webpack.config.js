const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractCssChunksPlugin = require("extract-css-chunks-webpack-plugin");
const StyleExtHtmlWebpackPlugin = require("style-ext-html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
            {
                test: /src\/.*\.css$/,
                exclude: [ path.resolve(__dirname, "src/styles") ],
                use: [
                    ExtractCssChunksPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[local]--[hash:base64:5]",
                            },
                            url: true,
                            importLoaders: 1,
                        },
                    },
                    "postcss-loader",
                ],
            },
            {
                test: /node_modules\/.*\.css$/,
                exclude: [ path.resolve(__dirname, "src/styles") ],
                use: [
                    ExtractCssChunksPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, "src/styles")
                ],
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ],
            },
            { test: /\.svg$/, use: "url-loader" },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/html/index.html",
        }),
        new ExtractCssChunksPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
            orderWarning: true,
            cssModules: true,
        }),
        new MiniCssExtractPlugin({
            filename: "global.css",
            chunkFilename: "[id].css",
            ignoreOrder: false,
        }),
        new StyleExtHtmlWebpackPlugin("global.css"),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        host: "0.0.0.0",
        public: "0.0.0.0:9000",
        port: 9000,
    },
};
