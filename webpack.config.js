const path = require("path");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        app: "./src/Client/Index.tsx"
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            {
                test: /\.css$/,
                loader: 'style-loader'
            }, {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            }
        ]
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(path.join(__dirname, "assets"))
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js", ".jsx", ".css" ]
    }
};
