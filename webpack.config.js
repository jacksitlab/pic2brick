const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const requirejsPlugin = require('requirejs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');



module.exports = (env) => {
    return [{
        entry: './src/app.tsx',
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'app.js'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: "babel-loader"
                    }, {
                        loader: "ts-loader"
                    }]
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: "babel-loader"
                    }]
                },
                {
                    //     // Transform our own .css files with PostCSS and CSS-modules
                    test: /\.css$/,
                    include: /node_modules/,
                    loader: ['style-loader', 'css-loader'],
                },
                {
                    //     // Transform our own .css files with PostCSS and CSS-modules
                    test: /\.css$/,
                    include: /src/,
                    loader: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|gif|jpg|svg)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10000,

                        }
                    }]
                }
            ]
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
            modules: ["src", "node_modules"]
        },
        optimization: {
            noEmitOnErrors: true,
            namedModules: env !== "release",
            minimize: env === "release",
            minimizer: env !== "release" ? [] : [new TerserPlugin({
                terserOptions: {
                    mangle: {
                        reserved: ["./app.tsx"]
                    },
                    warnings: false, // false, true, "verbose"
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                    }
                }
            })],
        },

        plugins: [
            new CopyWebpackPlugin([{
                from: './node_modules/requirejs/require.js',
                to: '.'
            }, {
                from: './src/favicon.ico',
                to: '.'
            }, {
                from: './src/index.html',
                to: '.'
            }]),/*
          new requirejsPlugin({
            path: path.resolve(__dirname, "dist"),
            filename: 'config.js',
            baseUrl: '',
            pathUrl: '',
            processOutput: function (assets) {
              return 'require.config(' + JSON.stringify(assets, null, 2) + ')';
            }
          })*/
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ]
    }]

}